import http from 'http';
import cluster from 'cluster';
import { Server } from './Server';

class WorkerServer extends Server {
  constructor(host: string, port: number) {
    super(host, port);
  }

  start() {
    return new Promise((resolve) => {
      this.server = http.createServer((req, res) => {
        console.log(`Request handled by process ${process.pid} at port ${this.port}`);
        this.router.handle(req, res);
      });

      this.server.listen(this.port, () => {
        console.log(`Worker server successfully running at http://${this.host}:${this.port}/`);
        resolve(null);
      });
    });
  }
}

export { WorkerServer };
