import http from 'http';
import dotenv from 'dotenv';
import { Router } from './modules/Router';
import { DataBase } from './modules/DataBase';
import { UserController } from './modules/UserController';

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;

const dataBase = new DataBase();
const userController = new UserController(dataBase);
const router = new Router(userController);

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

server.listen(port, () => {
  console.log(`Server successfully running at http://${host}:${port}/`);
});
