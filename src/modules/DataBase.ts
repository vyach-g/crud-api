import crypto from 'crypto';
import { User, UserDTO } from '../types/user';

class DataBase {
  list: User[];
  constructor() {
    this.list = [];
  }

  getAllUsers() {
    return this.list;
  }

  getUserById(userId: string) {
    const user = this.list.find((user) => user.id === userId);
    return user || null;
  }

  addUser(data: UserDTO) {
    console.log(data);
    const record = {
      id: crypto.randomUUID(),
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };
    this.list.push(record);

    return record;
  }

  updateUser(userId: string, data: UserDTO) {
    const record = this.getUserById(userId);
    Object.assign(record, { username: data.username, age: data.age, hobbies: data.hobbies });
    console.log('afterAssign');
    return record;
  }

  deleteUser(userId: string) {
    const record = this.getUserById(userId);
    this.list = this.list.filter((user) => user.id !== userId);
    return record;
  }
}

export { DataBase };
