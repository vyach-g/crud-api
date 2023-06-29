import { isUUID } from '../utils/utils.js';

class UserController {
  constructor(database) {
    this.database = database;
  }

  getAllUsers(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.statusCode = 200;
    res.write('getAllUsers');
    res.end();
  }

  getUserById(req, res) {
    // if (!isUUID(id)) {
    // }
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.statusCode = 200;
    res.write('getUserById');
    res.end();
  }

  addUser(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.statusCode = 200;
    res.write('addUser');
    res.end();
  }

  updateUser(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.statusCode = 200;
    res.write('updateUser');
    res.end();
  }

  deleteUser(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.statusCode = 200;
    res.write('deleteUser');
    res.end();
  }
}

export { UserController };
