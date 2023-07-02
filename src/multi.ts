import cluster, { Worker } from 'node:cluster';
import http from 'node:http';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import dotenv from 'dotenv';

import { Router } from './modules/Router';
import { DataBase } from './modules/DataBase';
import { UserController } from './modules/UserController';
import { DataBaseORM } from './modules/DataBaseORM';

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 4000;

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log('Wait for the server to fully start');
  console.log(`Primary ${process.pid} is running`);

  const dataBase = new DataBase();

  const workers: Worker[] = [];

  for (let i = 0; i < numCPUs - 1; i++) {
    const worker = cluster.fork();
    workers.push(worker);
  }

  workers.forEach((worker) => {
    worker.on('message', (message) => {
      console.log(message);
    });
  });

  let nextWorkerIndex = 0;

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  // this is necessary to prevent the server from crashing in case of a request after a short server start time
  setTimeout(() => {
    http
      .createServer((req, res) => {
        const requestOptions = {
          hostname: host,
          port: port + nextWorkerIndex,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const proxyReq = http.request(requestOptions, (proxyRes) => {
          res.writeHead(proxyRes.statusCode!, proxyRes.headers);
          proxyRes.pipe(res);
        });

        req.pipe(proxyReq);

        nextWorkerIndex = (nextWorkerIndex + 1) % numCPUs;
      })
      .listen(port);
    console.log(
      `Primary server started successfully, you can make requests with http://${host}:${port}/ `,
    );
  }, 5000);
} else {
  const dataBaseORM = new DataBaseORM();
  const userController = new UserController(dataBaseORM);
  const router = new Router(userController);

  const server = http.createServer((req, res) => {
    console.log(`Request handled by process ${process.pid} at port ${port + cluster.worker!.id}`);
    router.handle(req, res);
  });

  server.listen(port + cluster.worker!.id, () => {
    console.log(
      `Worker server successfully running at http://${host}:${port + cluster.worker!.id}/`,
    );
  });
}
