import { Message } from '../consts/message.js';
import { getReqData, isUUID, isUserDataValid } from '../utils/utils.js';

class UserController {
  constructor(database) {
    this.database = database;
  }

  getAllUsers(req, res) {
    const users = this.database.getAllUsers();
    this._sendResponse(res, users, 200);
  }

  getUserById(req, res, userId) {
    try {
      if (!isUUID(userId)) {
        this._sendResponse(res, { message: Message.WrongId }, 400);
        return;
      }

      const user = this.database.getUserById(userId);
      if (!user) {
        this._sendResponse(res, { message: Message.UserNotFound }, 404);
        return;
      }

      this._sendResponse(res, user, 200);
    } catch (e) {
      console.log(e);
      this._sendResponse(res, { message: Message.SomethingWrong }, 500);
    }
  }

  async addUser(req, res) {
    try {
      const data = JSON.parse(await getReqData(req));

      if (!isUserDataValid(data)) {
        this._sendResponse(res, { message: Message.UserValidationError }, 400);
        return;
      }

      const newUser = this.database.addUser(data);
      this._sendResponse(res, { message: Message.AddedSuccessfully, data: newUser }, 201);
    } catch (e) {
      console.log(e);
      this._sendResponse(res, { message: Message.AddingFailed }, 500);
    }
  }

  async updateUser(req, res, userId) {
    try {
      if (!isUUID(userId)) {
        this._sendResponse(res, { message: Message.WrongId }, 400);
        return;
      }

      const user = this.database.getUserById(userId);
      if (!user) {
        this._sendResponse(res, { message: Message.UserNotFound }, 404);
        return;
      }

      const data = JSON.parse(await getReqData(req));
      if (!isUserDataValid(data)) {
        this._sendResponse(res, { message: Message.UserValidationError }, 400);
        return;
      }

      const updatedUser = this.database.updateUser(userId, data);
      this._sendResponse(res, { message: Message.UpdatedSuccessfully, data: updatedUser }, 200);
    } catch (e) {
      console.log(e);
      this._sendResponse(res, { message: Message.SomethingWrong }, 500);
    }
  }

  async deleteUser(req, res, userId) {
    try {
      if (!isUUID(userId)) {
        this._sendResponse(res, { message: Message.WrongId }, 400);
        return;
      }

      const user = this.database.getUserById(userId);
      if (!user) {
        this._sendResponse(res, { message: Message.UserNotFound }, 404);
        return;
      }

      const deleted = this.database.deleteUser(userId);
      this._sendResponse(res, { message: Message.DeletedSuccessfully, data: deleted }, 204);
    } catch (e) {
      console.log(e);
      this._sendResponse(res, { message: Message.SomethingWrong }, 500);
    }
  }

  _sendResponse(res, data, statusCode) {
    res.setHeader('Content-Type', 'application/json;');
    res.statusCode = statusCode;
    res.write(JSON.stringify(data));
    res.end();
  }
}

export { UserController };
