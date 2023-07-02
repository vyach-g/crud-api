import crypto from 'crypto';
import { User, UserDTO } from '../types/user';

class DataBase {
  list: User[];
  constructor() {
    this.list = [];
  }

  getAllUsers() {
    return new Promise((res, rej) => {
      res(this.list);
    });
  }

  getUserById(userId: string) {
    return new Promise((res, rej) => {
      const user = this.list.find((user) => user.id === userId);
      res(user || null);
    });
  }

  addUser(data: UserDTO) {
    return new Promise((res, rej) => {
      const record = {
        id: crypto.randomUUID(),
        username: data.username,
        age: data.age,
        hobbies: data.hobbies,
      };
      this.list.push(record);
      res(record);
    });
  }

  updateUser(userId: string, data: UserDTO) {
    return new Promise((res, rej) => {
      const record = this.getUserById(userId)!;
      Object.assign(record, { username: data.username, age: data.age, hobbies: data.hobbies });
      res(record);
    });
  }

  deleteUser(userId: string) {
    return new Promise((res, rej) => {
      const record = this.getUserById(userId);
      this.list = this.list.filter((user) => user.id !== userId);
      res(record);
    });
  }
}

export { DataBase };

// import crypto from 'crypto';
// import { User, UserDTO } from '../types/user';
// import process from 'node:process';
// import { DataBase } from './DataBase';

// class WorkerDataBase extends DataBase {
//   list: User[];
//   constructor() {
//     this.list = [];
//   }

//   getAllUsers() {
//     this._execSharedDb('getAllUsers');
//   }

//   getUserById(userId: string) {
//     this._execSharedDb('getUserById', userId);
//   }

//   addUser(data: UserDTO) {
//     this._execSharedDb('addUser', data);
//   }

//   updateUser(userId: string, data: UserDTO) {
//     this._execSharedDb('addUser', userId, data);
//   }

//   deleteUser(userId: string) {
//     this._execSharedDb('addUser', userId);
//   }

//   _execSharedDb(method: string, ...args: any[]) {
//     process.send!({ method: method, data: args });
//   }
// }

// export { WorkerDataBase };
