import http from 'http';
import { Router } from './modules/Router.js';
import { DataBase } from './modules/DataBase.js';
import { UserController } from './modules/UserController.js';

const host = '127.0.0.1';
const port = 3000;

const dataBase = new DataBase();
const userController = new UserController(dataBase);
const router = new Router(userController);

const server = http.createServer((req, res) => {
  router.handle(req, res);

  // res.end('Hello');
});

server.listen(port, host, () => {
  console.log(`Server successfully running at http://${host}:${port}/`);
});

const ENDPOINTS = {
  API_USER: 'api/user',
};
