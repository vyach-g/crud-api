import http from 'http';
import dotenv from 'dotenv';
import { Router } from './modules/Router';
import { DataBase } from './modules/DataBase';
import { UserController } from './modules/UserController';
import { DataBaseORM } from './modules/DataBaseORM';

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;

const dataBase = new DataBase();
const dataBaseORM = new DataBaseORM();
const userController = new UserController(dataBaseORM);
const router = new Router(userController);

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

server.listen(port, () => {
  console.log(`Server successfully running at http://${host}:${port}/`);
});
