import http from 'http';
import dotenv from 'dotenv';
import { DataBaseMethods, DataBasePayload } from './DataBase';
import { User } from '../types/user';

dotenv.config();

const host = process.env.HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5000;

class DataBaseORM {
  constructor() {}

  _makeRequest(method: DataBaseMethods, payload: DataBasePayload) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify({
        method: method,
        payload: payload,
      });

      const options = {
        hostname: host,
        port: dbPort,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      let data = '';

      const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });

      req.write(postData);
      req.end();
    });
  }

  async getAllUsers() {
    const res = await this._makeRequest('getAllUsers', {});
    return res as User[];
  }

  async getUserById(payload: DataBasePayload) {
    const res = await this._makeRequest('getUserById', payload);
    return res as User | null;
  }

  async addUser(payload: DataBasePayload) {
    const res = await this._makeRequest('addUser', payload);
    return res as User;
  }

  async updateUser(payload: DataBasePayload) {
    const res = await this._makeRequest('updateUser', payload);
    return res as User;
  }

  async deleteUser(payload: DataBasePayload) {
    const res = await this._makeRequest('deleteUser', payload);
    return res as User | null;
  }
}

export { DataBaseORM };
