# nestjs-and-mongodb-microservices
A simple system that create posts and fetch created posts from mongo

## Description

includes 2 containers:
- **rest-server**: NestJS controller to create posts and get all posts from db
- **mongodb**: Shared database to store posts details.

## Quick Start

1. Install [Docker Compose](https://docs.docker.com/compose/install/) and make sure it is running in the system background.

2. Fetch the code
 
```bash
$ git clone https://github.com/evgi99/nestjs-and-mongodb.git
```

3. Running all services with docker-compose (detach mode)

```bash
$ cd nestjs-and-mongodb
$ docker-compose up -d 
```

4. Check everything is running (list running processes):
```bash
$ docker ps 

CONTAINER ID   IMAGE             .....    PORTS                              NAMES
c7412c97a170   rest-server-app   .....    0.0.0.0:3009->3009/tcp             rest-server
0cc8f62ffeaf   mongo             .....    0.0.0.0:27017->27017/tcp           mongodb
```

## Usage (Application Demo) 
> **_NOTE:_** APIs could be tested with help of [Postman](https://www.postman.com/)


## Running the app when developing

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Evgi99](https://github.com/evgi99)

