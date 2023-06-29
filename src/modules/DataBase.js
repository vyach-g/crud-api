import crypto from 'crypto';

const userModel = {
  id: 'string', // generated on server
  username: 'string', // required
  age: 'number', //required
  hobbies: '[string, string]', //required
};

class DataBase {
  constructor() {
    this.list = [];
  }

  getAllUsers() {
    return this.list;
  }

  getUserById(userId) {
    const user = this.list.find((user) => user.id === userId);
  }

  addUser(data) {
    const record = {
      id: crypto.randomUUID(),
      username: data.username,
      age: data.age,
      hobbies: data.hobbies,
    };

    this.list.push(record);
  }
}

export { DataBase };
