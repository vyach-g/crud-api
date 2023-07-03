import cluster, { Worker } from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import dotenv from 'dotenv';

import { DataBase } from './modules/DataBase';
import { WorkerServer } from './modules/WorkerServer';
import { Balancer } from './modules/Balancer';

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 4000;
const dbPort = Number(process.env.DB_PORT) || 5000;

const numCPUs = availableParallelism();

function startServer() {
  if (cluster.isPrimary) {
    console.log('Wait for the server to fully start');
    console.log(`Primary ${process.pid} is running`);

    const dataBase = new DataBase(host, dbPort);
    dataBase.start();

    const workers: Worker[] = [];
    const workerPromises: Promise<any>[] = [];

    for (let i = 0; i < numCPUs - 1; i++) {
      const worker = cluster.fork();
      workers.push(worker);
      const promise = new Promise((resolve) => {
        worker.on('message', (message) => {
          resolve(null);
        });
      });
      workerPromises.push(promise);
    }

    cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    const balancer = new Balancer(host, port, numCPUs);
    const balancerStartPromise = balancer.start();

    const allIsLoaded = Promise.all([...workerPromises, balancerStartPromise]);
    // allIsLoaded.then(() => {
    //   workers.forEach((worker) => {
    //     worker.send('allIsLoaded');
    //   });
    // });
    return allIsLoaded;
  } else {
    const workerServer = new WorkerServer(host, port + cluster.worker!.id);
    const workerServerStart = workerServer.start();
    workerServerStart.then(() => {
      cluster.worker?.send(cluster.worker!.id);
    });

    // const allIsLoaded = new Promise((resolve) => {
    //   cluster.worker?.on('message', () => {
    //     resolve(null);
    //   });
    // });
    // return allIsLoaded;
  }
}

function closeServer() {}

export { startServer, closeServer };
