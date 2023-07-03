import http from 'http';

class Balancer {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined;
  port: number;
  host: string;
  numCpus: number;
  workerIndex = 0;

  constructor(host: string, port: number, numCpus: number) {
    this.host = host;
    this.port = port;
    this.numCpus = numCpus;
  }

  start() {
    return new Promise((resolve) => {
      this.server = http
        .createServer((req, res) => {
          const requestOptions = {
            hostname: this.host,
            port: this.port + this.workerIndex,
            path: req.url,
            method: req.method,
            headers: req.headers,
          };

          const proxyReq = http.request(requestOptions, (proxyRes) => {
            res.writeHead(proxyRes.statusCode!, proxyRes.headers);
            proxyRes.pipe(res);
          });

          req.pipe(proxyReq);

          this.workerIndex = (this.workerIndex + 1) % this.numCpus;
        })
        .listen(this.port, () => {
          console.log(
            `Primary server started successfully, you can make requests with http://${this.host}:${this.port}/ `,
          );
          resolve(null);
        });
    });
  }

  close() {}
}

export { Balancer };
