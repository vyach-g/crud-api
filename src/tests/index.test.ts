import { startServer, closeServer } from '../multi';
import { User } from '../types/user';
import { TestRequest } from './TestRequest';
import { user1, user2, userBroken } from './mocks';

afterAll(() => {
  closeServer();
});

beforeAll(async () => {
  const promises = startServer();
  // @ts-ignore
  Promise.all(promises).then(() => {
    console.log('started');
  });
});

describe('single server, every endpoint', () => {
  test('db is empty initially', async () => {
    const users = await TestRequest.getAll();
    expect(users.payload).toBeInstanceOf(Array);
    expect(users.payload).toEqual([]);
  });

  //   test('creates user', async () => {
  //     const newUser = await TestRequest.addUser(user1);
  //     expect(newUser.payload.data).toEqual(expect.objectContaining(user1));
  //   });

  //   test('get created user via all users', async () => {
  //     const users = await TestRequest.getAll();
  //     expect(users.payload).toBeInstanceOf(Array);
  //     expect(users.payload).toEqual([expect.objectContaining(user1)]);
  //   });

  //   test('get created user by id', async () => {
  //     const users = await TestRequest.getAll();
  //     const userId = users.payload[0].id;
  //     const user = await TestRequest.getById(userId);

  //     expect(user.payload).toEqual(expect.objectContaining(user1));
  //     expect(user.payload.id).toEqual(userId);
  //   });

  //   test('update created user by id, id persists', async () => {
  //     const users = await TestRequest.getAll();
  //     const userId = users.payload[0].id;
  //     const user = await TestRequest.updateUser(userId, user2);

  //     expect(user.payload.data).toEqual(expect.objectContaining(user2));
  //     expect((user.payload.data as User).id).toEqual(userId);
  //   });

  //   test('delete user by id, users empty', async () => {
  //     const users = await TestRequest.getAll();
  //     const userId = users.payload[0].id;
  //     const user = await TestRequest.deleteUser(userId);
  //     const emptyUsers = await TestRequest.getAll();

  //     expect(emptyUsers.payload).toEqual([]);
  //   });
});

describe('check successful status-codes', () => {
  //   test('201 status on completed add user', async () => {
  //     const newUser = await TestRequest.addUser(user1);
  //     expect(newUser.status).toEqual(201);
  //   });
  //   test('200 status on completed get all users', async () => {
  //     const users = await TestRequest.getAll();
  //     expect(users.status).toEqual(200);
  //   });
  //   test('200 status on completed get user by id', async () => {
  //     const users = await TestRequest.getAll();
  //     const userId = users.payload[0].id;
  //     const user = await TestRequest.getById(userId);
  //     expect(user.status).toEqual(200);
  //   });
  //   test('200 status on completed update user by id', async () => {
  //     const users = await TestRequest.getAll();
  //     const userId = users.payload[0].id;
  //     const user = await TestRequest.updateUser(userId, user2);
  //     expect(user.status).toEqual(200);
  //   });
  //   test('204 status on completed delete user by id', async () => {
  //     const users = await TestRequest.getAll();
  //     const userId = users.payload[0].id;
  //     const user = await TestRequest.deleteUser(userId);
  //     expect(user.status).toEqual(204);
  //   });
});

describe('not-existing route handling & data verification', () => {
  // test('404 status on non-existing route', async () => {
  //   const res = await TestRequest.getNotFound('/path');
  //   const res2 = await TestRequest.getNotFound('/not-found');
  //   expect(res.status).toEqual(404);
  //   expect(res2.status).toEqual(404);
  // });
  // test('400 status on get ot put by non-userId', async () => {
  //   const notUserId = 'fake';
  //   const res = await TestRequest.getById(notUserId);
  //   const res2 = await TestRequest.updateUser(notUserId, user1);
  //   expect(res.status).toEqual(400);
  //   expect(res2.status).toEqual(400);
  // });
  // test('400 status on non-valid user data', async () => {
  //   const res = await TestRequest.addUser(userBroken);
  //   expect(res.status).toEqual(400);
  // });
});
