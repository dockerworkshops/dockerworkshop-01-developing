const express = require('express');
const app = express();

/*
 * We are storing the secret needed for JWT signing and verifying
 * in an environmental variable TOKEN_SECRET stored in the .env
 * file and loaded into `process.env` with the `dotenv` library.
 * */

require('dotenv').config();

/*
 * loginRouter is responsible for authenticating users based on
 * a local user name and password strategy. Upon successful login
 * it will deliver a JWT to the client to be used for subsequent
 * requests.
* */

const loginRouter = require('./routers/login');

/*
 * usersRouter provides routes for authenticated users.
* */

const usersRouter = require('./routers/users');

/*
 * Placeholder root route for this trivial application.
* */

app.get('/', (req, res) => {
  res.send('Please login');
});

app.use('/login', loginRouter);
app.use('/users', usersRouter);

/*
 * Fallthrough route handler for any requests to routes
 * not deliberately handled.
* */

app.use((req, res) => {
  res.sendStatus(404);
});

/*
 * Prevent having to stop the server when running tests by
 * not listening if this file is required by another module
 * such as a test file.
* */

if (!module.parent) {
  app.listen(8000, () => {
    console.log('Express server listening on port 8000');
  });
}

/*
 * Export app for testing.
* */

module.exports = app;
