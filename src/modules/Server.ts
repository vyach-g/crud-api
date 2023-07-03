import http from 'http';

import { Router } from './Router';
import { DataBase } from './DataBase';
import { UserController } from './UserController';
import { DataBaseORM } from './DataBaseORM';

class Server {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined;
  dataBaseORM: DataBaseORM;
  userController: UserController;
  router: Router;
  port: number;
  host: string;

  constructor(host: string, port: number) {
    this.dataBaseORM = new DataBaseORM();
    this.userController = new UserController(this.dataBaseORM);
    this.router = new Router(this.userController);
    this.host = host;
    this.port = port;
  }

  start() {
    return new Promise((resolve) => {
      this.server = http.createServer((req, res) => {
        this.router.handle(req, res);
      });

      this.server.listen(this.port, () => {
        console.log(`Server successfully running at http://${this.host}:${this.port}/`);
        resolve(null);
      });
    });
  }

  close() {
    this.server?.close();
  }
}

export { Server };
