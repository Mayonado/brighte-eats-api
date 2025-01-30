# Brighte Eats API

Service API that handles user registration with a preferred service type, retrieves the leading service type, and provides a list of service types along with the total number of interests.

## Prerequisites

- PostgreSQL Database setup
- NodeJS Installed
- Alternatively, We can run the app on Docker

GraphQL Endpoint

`http://localhost:3001/user`

**GraphQL Mutation**

```graphql
mutation Register(
  $name: String!
  $email: String!
  $mobile: String!
  $postcode: String!
  $service_type: SERVICE_TYPE
) {
  register(
    name: $name
    mobile: $mobile
    email: $email
    postcode: $postcode
    service_type: $service_type
  ) {
    id
    email
  }
}
```

**Variables**

```graphql
{
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "mobile": "+2893283",
    "postcode": "2854",
    "service_type": "DELIVERY"
}
```

**GraphQL Queries**

```graphql
query LeadQuery {
  lead {
    service_type
    totalNoOfInterests
  }
}

query LeadsQuery {
  leads {
    service_type
    totalNoOfInterests
  }
}
```

## Setup Procedure

1. Make a copy of environment variables, and adjust accordingly to match local setup

```bash
cp .env.example .env
```

2. In terminal, Run `npm install` to install dependencies.

3. Then, Run database migration script.

```bash
npm run db:migrate
```

Make sure to have your database setup and the env variables are setup properly.

4. Run the development server.

```bash
npm start
```

After running the command, the api server will be started on port `3001`

**To run it on Docker.**

Make sure you have your Docker tools such as Docker Desktop, Rancher, etc. installed on your machine.

1. Dockerfile && docker-compose.yaml are already provided in this repository.
2. In terminal, run

```bash
docker compose up
```

There are 2 services defined in docker-compose.yaml.

- db - PostgreSQL database cloned image from Dockerhub
- brighte-eats-api - config to build and run api container

3. Once, the command succeeds, the server will be started on url `http://localhost:3001` and you should see something like this.

```bash
brighte-eats-api-1  |
brighte-eats-api-1  | > brighte-eats-api@1.0.0 db:migrate
brighte-eats-api-1  | > npx sequelize-cli db:migrate
brighte-eats-api-1  |
brighte-eats-api-1  | npm warn exec The following package was not found and will be installed: sequelize-cli@6.6.2
brighte-eats-api-1  |
brighte-eats-api-1  | Sequelize CLI [Node: 22.13.1, CLI: 6.6.2, ORM: 6.37.5]
brighte-eats-api-1  |
brighte-eats-api-1  | Loaded configuration file "config/config.js".
brighte-eats-api-1  | Using environment "development".
brighte-eats-api-1  | No migrations were executed, database schema was already up to date.
brighte-eats-api-1  | npm notice
brighte-eats-api-1  | npm notice New major version of npm available! 10.9.2 -> 11.0.0
brighte-eats-api-1  | npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.0.0
brighte-eats-api-1  | npm notice To update run: npm install -g npm@11.0.0
brighte-eats-api-1  | npm notice
brighte-eats-api-1  | Running worker with pid 55
```

## Test Coverage

| File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ----------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files         | 92.09   | 86.66    | 81.81   | 92.09   |
| graphql           | 100     | 100      | 100     | 100     |
| user.graphql.ts   | 100     | 100      | 100     | 100     |
| services/user     | 83.33   | 80       | 80      | 83.33   |
| user.interface.ts | 0       | 0        | 0       | 0       | 1-6               |
| user.service.ts   | 100     | 100      | 100     | 100     |
| utils             | 88.04   | 50       | 50      | 88.04   |
| constants.ts      | 100     | 100      | 100     | 100     |
| custom-error.ts   | 100     | 100      | 100     | 100     |
| database.ts       | 70.27   | 100      | 0       | 70.27   | 15,19,23,27,31-37 |
| logger.ts         | 100     | 0        | 100     | 100     | 13                |

Test Suites: 2 passed, 2 total<br>
Tests: 8 passed, 8 total
