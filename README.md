# crud-api

#### Setup server

Clone this repository
Run `npm install` to install dependencies
Create `.env` file like existing `.env.example` or just rename it

#### Run server

`npm run start:dev` - run in development mode
`npm run start:prod` - build and run in production mode
`npm run start:multi` - run multi-instance with round-robin balancer
`npm run start` - simple start single instance

#### Run tests

`npm run test` - run tests
`npm run test:reserve` - run tests, reserve version

Use `npm run test`, but if it fails, try to increase time in index.test.ts. If it fails anyway - try to use `npm run test:reserve`
