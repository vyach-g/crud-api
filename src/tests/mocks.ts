const user1 = {
  username: 'Vasya',
  age: 22,
  hobbies: ['swim', 'cats'],
};

const user2 = {
  username: 'Sanya',
  age: 35,
  hobbies: ['drink'],
};

const userBroken = {
  username: 'Sanya',
  age: 35,
  hobbies: 'not-an-array',
};

export { user1, user2, userBroken };
