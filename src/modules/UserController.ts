import { Message } from '../consts/message';
import { getReqData, isUUID, isUserDataValid } from '../utils/utils';
import { DataBaseORM } from './DataBaseORM';
import { ResponseDTO, httpRequest, httpResponse } from '../types/http';

class UserController {
  orm: DataBaseORM;

  constructor(orm: DataBaseORM) {
    this.orm = orm;
  }

  async getAllUsers(req: httpRequest, res: httpResponse) {
    const users = await this.orm.getAllUsers();
    this._sendResponse(res, users, 200);
  }

  async getUserById(req: httpRequest, res: httpResponse, userId: string) {
    try {
      if (!isUUID(userId)) {
        this._sendResponse(res, { message: Message.WrongId }, 400);
        return;
      }

      const user = await this.orm.getUserById({ userId });
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

  async addUser(req: httpRequest, res: httpResponse) {
    try {
      const rawData = (await getReqData(req)) as string;
      const data = JSON.parse(rawData);

      if (!isUserDataValid(data)) {
        this._sendResponse(res, { message: Message.UserValidationError }, 400);
        return;
      }

      const newUser = await this.orm.addUser({ data });
      this._sendResponse(res, { message: Message.AddedSuccessfully, data: newUser }, 201);
    } catch (e) {
      console.log(e);
      this._sendResponse(res, { message: Message.AddingFailed }, 500);
    }
  }

  async updateUser(req: httpRequest, res: httpResponse, userId: string) {
    try {
      if (!isUUID(userId)) {
        this._sendResponse(res, { message: Message.WrongId }, 400);
        return;
      }

      const user = await this.orm.getUserById({ userId });
      if (!user) {
        this._sendResponse(res, { message: Message.UserNotFound }, 404);
        return;
      }

      const rawData = (await getReqData(req)) as string;
      const data = JSON.parse(rawData);
      if (!isUserDataValid(data)) {
        this._sendResponse(res, { message: Message.UserValidationError }, 400);
        return;
      }

      const updatedUser = await this.orm.updateUser({ userId, data });
      this._sendResponse(res, { message: Message.UpdatedSuccessfully, data: updatedUser }, 200);
    } catch (e) {
      console.log(e);
      this._sendResponse(res, { message: Message.SomethingWrong }, 500);
    }
  }

  async deleteUser(req: httpRequest, res: httpResponse, userId: string) {
    try {
      if (!isUUID(userId)) {
        this._sendResponse(res, { message: Message.WrongId }, 400);
        return;
      }

      const user = await this.orm.getUserById({ userId });
      if (!user) {
        this._sendResponse(res, { message: Message.UserNotFound }, 404);
        return;
      }

      const deleted = await this.orm.deleteUser({ userId });
      this._sendResponse(res, { message: Message.DeletedSuccessfully, data: deleted }, 204);
    } catch (e) {
      console.log(e);
      this._sendResponse(res, { message: Message.SomethingWrong }, 500);
    }
  }

  _sendResponse(res: httpResponse, data: ResponseDTO, statusCode: number) {
    res.setHeader('Content-Type', 'application/json;');
    res.statusCode = statusCode;
    res.write(JSON.stringify(data));
    res.end();
  }
}

export { UserController };
