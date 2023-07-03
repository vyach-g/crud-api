import cluster, { Worker } from 'node:cluster';
import http from 'node:http';

import process from 'node:process';
import dotenv from 'dotenv';

import { DataBase } from './modules/DataBase';
import { WorkerServer } from './modules/WorkerServer';
import { Balancer } from './modules/Balancer';

import { availableParallelism } from 'node:os';
const numCPUs = availableParallelism();
dotenv.config();

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 4000;
const dbPort = Number(process.env.DB_PORT) || 5000;

const workers: Worker[] = [];
const workerPromises: Promise<null>[] = [];

async function startServer() {
  if (cluster.isPrimary) {
    console.log('Waiting for the server to fully start');
    console.log(`Primary ${process.pid} is running`);

    const dataBase = new DataBase(host, dbPort);
    await dataBase.start();

    const balancer = new Balancer(host, port, numCPUs);
    await balancer.start();

    for (let i = 0; i < numCPUs - 1; i++) {
      const worker = cluster.fork();

      const promise = new Promise((resolve) => {
        workers.push(worker);
        worker.on('message', (content) => {
          resolve(null);
          console.log('message from worker:', content);
          console.log(workerPromises);
        });
      }) as Promise<null>;

      workerPromises.push(promise);
    }

    cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    return workerPromises;
  } else {
    const workerServer = new WorkerServer(host, port + cluster.worker!.id);
    await workerServer.start();
    process.send!({ words: 'words' });
  }
}

startServer();

function closeServer() {
  console.log('closed');
}

export { startServer, closeServer };
