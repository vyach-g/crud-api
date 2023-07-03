export type User = {
  username: string;
  age: number;
  hobbies: string[];
  id: string;
};

export type UserDTO = Omit<User, 'id'>;
