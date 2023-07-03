import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

import crypto from 'crypto';
import { User, UserDTO } from '../types/user';
import { getReqData } from '../utils/utils';

class DataBase {
  list: User[];
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined;
  port: number;
  host: string;
  constructor(host: string, port: number) {
    this.list = [];
    this.host = host;
    this.port = port;
  }

  start() {
    return new Promise((resolve) => {
      this.server = http.createServer(async (req, res) => {
        try {
          if (req.method === 'POST') {
            const rawDbAction = (await getReqData(req)) as string;
            const { method, payload } = JSON.parse(rawDbAction) as DataBaseAction;
            const result = this[method](payload);
            res.write(JSON.stringify(result));
            res.end();
          } else {
            usedDirectly();
          }
        } catch (e) {
          usedDirectly();
        }

        function usedDirectly() {
          res.write(JSON.stringify({ message: "Don't use DB directly" }));
          res.end();
          console.log("!!! Don't use DB directly !!!");
        }
      });

      this.server.listen(this.port, () => {
        console.log(
          `DB successfully running at http://${this.host}:${this.port}/ (You shouldn't use it)`,
        );
        resolve(null);
      });
    });
  }

  getAllUsers() {
    return this.list;
  }

  getUserById(payload: DataBasePayload) {
    const { userId, data } = payload;
    const user = this.list.find((user) => user.id === userId);
    return user || null;
  }

  addUser(payload: DataBasePayload) {
    const { userId, data } = payload;
    const record = {
      id: crypto.randomUUID(),
      username: data!.username,
      age: data!.age,
      hobbies: data!.hobbies,
    } as User;
    this.list.push(record);

    return record;
  }

  updateUser(payload: DataBasePayload) {
    const { userId, data } = payload;
    const record = this.getUserById({ userId })!;
    Object.assign(record, { username: data!.username, age: data!.age, hobbies: data!.hobbies });
    return record;
  }

  deleteUser(payload: DataBasePayload) {
    const { userId, data } = payload;
    const record = this.getUserById({ userId });
    this.list = this.list.filter((user) => user.id !== userId);
    return record;
  }

  close() {
    this.server?.close();
  }
}

export { DataBase };

export type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

export type DataBaseMethods = MethodKeys<DataBase>;
export type DataBasePayload = {
  userId?: string;
  data?: UserDTO;
};

export type DataBaseAction = {
  method: DataBaseMethods;
  payload: DataBasePayload;
};
