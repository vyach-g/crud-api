import http from 'http';
import dotenv from 'dotenv';
import { Router } from './modules/Router.js';
import { DataBase } from './modules/DataBase.js';
import { UserController } from './modules/UserController.js';

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;

const dataBase = new DataBase();
const userController = new UserController(dataBase);
const router = new Router(userController);

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

server.listen(port, host, () => {
  console.log(`Server successfully running at http://${host}:${port}/`);
});
