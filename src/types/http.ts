import http from 'http';
import { User } from './user';
import { Message } from '../consts/message';

export type httpRequest = http.IncomingMessage;
export type httpResponse = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

export type ResponseDTO =
  | {
      message?: Message | string;
      data?: User | User[] | null;
    }
  | User
  | User[];
