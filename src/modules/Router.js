import { getSplittedPath } from '../utils/utils.js';

class Router {
  constructor(controller) {
    this.controller = controller;
  }

  handle(req, res) {
    const path = getSplittedPath(req.url);

    const method = req.method;
    console.log(path);

    if (path[0] === 'api' && path[1] === 'users') {
      switch (method) {
        case 'GET':
          if (path[2]) {
            this.controller.getUserById(req, res);
          } else {
            this.controller.getAllUsers(req, res);
          }
          break;
        case 'POST':
          this.controller.addUser(req, res);
          break;
        case 'PUT':
          this.controller.editUser(req, res);
          break;
        case 'DELTE':
          this.controller.deleteUser(req, res);
          break;
      }

      return;
    }
    this.throwNotFound(req, res);
    // switch(req.url) {
    //   case
    // }
  }

  throwNotFound(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.statusCode = 404;
    res.write('<h1>Page Not Found</h1>');
    res.end();
  }
}

export { Router };
