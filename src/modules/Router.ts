import { httpRequest, httpResponse } from '../types/http';
import { Message } from '../consts/message';
import { getSplittedPath } from '../utils/utils';
import { UserController } from './UserController';

class Router {
  controller: UserController;

  constructor(controller: UserController) {
    this.controller = controller;
  }

  handle(req: httpRequest, res: httpResponse) {
    const path = getSplittedPath(req.url!);

    const method = req.method;
    console.log(`New request: ${method} ${req.url}`);

    if (path[0] === 'api' && path[1] === 'users') {
      switch (method) {
        case 'GET':
          if (path[2]) {
            this.controller.getUserById(req, res, path[2]);
          } else {
            this.controller.getAllUsers(req, res);
          }
          break;

        case 'POST':
          this.controller.addUser(req, res);
          break;

        case 'PUT':
          if (path[2]) {
            this.controller.updateUser(req, res, path[2]);
          } else {
            this.throwNoId(req, res);
          }
          break;

        case 'DELETE':
          if (path[2]) {
            this.controller.deleteUser(req, res, path[2]);
          } else {
            this.throwNoId(req, res);
          }
          break;

        default:
          this.throwUnsupported(req, res);
          break;
      }

      return;
    }
    this.throwNotFound(req, res);
  }

  throwNoId(req: httpRequest, res: httpResponse) {
    res.setHeader('Content-Type', 'application/json;');
    res.statusCode = 400;
    res.write(JSON.stringify({ message: Message.IdNotSpecified }));
    res.end();
  }

  throwUnsupported(req: httpRequest, res: httpResponse) {
    res.setHeader('Content-Type', 'application/json;');
    res.statusCode = 400;
    res.write(JSON.stringify({ message: Message.UnsupportedMethod }));
    res.end();
  }

  throwNotFound(req: httpRequest, res: httpResponse) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.statusCode = 404;
    res.write(JSON.stringify({ message: Message.RouteNotFound }));
    res.end();
  }
}

export { Router };
