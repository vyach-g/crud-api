import crypto from 'crypto';

// const userModel = {
//   id: 'string', // generated on server
//   username: 'string', // required
//   age: 'number', //required
//   hobbies: '[string, string]', //required
// };

class DataBase {
  constructor() {
    this.list = [];
  }

  getAllUsers() {
    return this.list;
  }

  getUserById(userId) {
    const user = this.list.find((user) => user.id === userId);
    return user || null;
  }

  addUser(data) {
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

  updateUser(userId, data) {
    const record = this.getUserById(userId);
    Object.assign(record, { username: data.username, age: data.age, hobbies: data.hobbies });
    console.log('afterAssign');
    return record;
  }

  deleteUser(userId) {
    const record = this.getUserById(userId);
    this.list = this.list.filter((user) => user.id !== userId);
    return record;
  }
}

export { DataBase };
