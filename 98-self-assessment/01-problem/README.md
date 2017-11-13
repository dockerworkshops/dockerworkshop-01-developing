# Self Assessment

## Current State of Application

This directory contains an already working application that consists of a (simple) API server that interacts with a PostgreSQL instance.

Assuming the existence of a running Postgres server on port `5432` this application can be run without Docker by issuing `npm install` and then `npm start`. Once the application is running, the tests can be run with `npm test`. Again, assuming the presence of an already-running Postgres server on `5432`, all the tests will pass.

We would like for to Dockerize this application so that consumers of it have no need of managing their own Postgres servers locally.

Part of the necessary work has already been done to Dockerize this application:

- A `Dockerfile` has been created
- A `docker-compose.yml` defining `api` `dev-db` and `test-db` services has been created
- Most of the application code has been written to support connections to Dockerized services
- An `npm run docker-test` command has been written that will run the tests in a Dockerized version of the application

## Your Task: Dockerize

There are 2 tasks that still need completing before this application will run correctly inside of Docker containers:

1) The `Dockerfile` needs completing. Please see the comments in the `Dockerfile` for specifics about what is not yet complete
1) The `docker-compose.yml` needs completing. Specifically, the `api` service it defines is expecting two environmental variables that it has not yet been provided: `DEV_DB_HOST` and `TEST_DB_HOST`. Your task is to provide these 2 environmental variables to the `api` service, and, to give them values that will allow the containerized `api` service to connect to the `dev-db` and `test-db` services respectively.

When you have successfully completed your work you ought to be able to run `docker-compose up -d` and see all three services successfully running, and then, `npm run docker-test` and see the successful output of the running tests.
