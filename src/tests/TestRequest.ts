import http from 'http';
import dotenv from 'dotenv';
import { DataBaseMethods, DataBasePayload } from '../modules/DataBase';
import { User } from '../types/user';

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

class TestRequest {
  constructor() {}

  _makeRequest(path: string, method: string, sendData: object | null = null) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(sendData);

      const options = {
        hostname: host,
        port: port,
        path: path,
        method: method,
      };

      let data = '';

      const req = http.request(options, (res) => {
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ payload: data ? JSON.parse(data) : null, status: res.statusCode });
        });
      });

      req.on('error', (error) => {
        console.error(`Request error: ${error.message}`);
      });
      req.write(postData);
      req.end();
    });
  }

  getAll() {
    return this._makeRequest('/api/users', 'GET') as Promise<{ payload: User[]; status: number }>;
  }

  getNotFound(path: string) {
    return this._makeRequest(path, 'GET') as Promise<{
      payload: { message: string };
      status: number;
    }>;
  }

  getById(userId: string) {
    return this._makeRequest('/api/users/' + userId, 'GET') as Promise<{
      payload: User;
      status: number;
    }>;
  }

  addUser(user: object) {
    return this._makeRequest('/api/users', 'POST', user) as Promise<{
      payload: {
        data?: User;
        message: string;
      };
      status: number;
    }>;
  }

  updateUser(userId: string, user: object) {
    return this._makeRequest('/api/users/' + userId, 'PUT', user) as Promise<{
      payload: {
        data?: User;
        message: string;
      };
      status: number;
    }>;
  }

  deleteUser(userId: string) {
    return this._makeRequest('/api/users/' + userId, 'DELETE') as Promise<{
      payload: {
        data: User;
        message: string;
      };
      status: number;
    }>;
  }
}

const TestRequestInstance = new TestRequest();
export { TestRequestInstance as TestRequest };
