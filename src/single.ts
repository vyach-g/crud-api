import { DataBase } from './modules/DataBase';
import { Server } from './modules/Server';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 4000;
const dbPort = Number(process.env.DB_PORT) || 5000;

const dataBase = new DataBase(host, dbPort);
const server = new Server(host, port);

server.start();
dataBase.start();
