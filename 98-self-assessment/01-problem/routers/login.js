const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { jwtSignAsync } = require('../utils/jsonwebTokenAsync');
const UsersService = require('../services/UsersService');

/*
 * Database interactions for user information have been abstracted
 * into `UsersService`, which defines methods needed for accessing
 * user information in Postgres via knex.
* */

const users = new UsersService();

/*
 * This `TOKEN_SECRET` must be used to both sign and verify
 * any JWTs supplied by this API.
* */

const { TOKEN_SECRET } = process.env;

router.use(bodyParser.json());

router.post('/', verifyLoginBody, checkIfUserIsRegistered, tryUserLogin, generateToken, (req, res) => {
  const token = req.user.token;
  res.set('Auth', `Bearer: ${token}`).send('password correct, jwt set in auth cookie');
});

function verifyLoginBody(req, res, next) {
  const { username, password } = req.body;
  if (!username && !password) {
    res.status(401).send('Username and password required');
  } else if (!username) {
    res.status(401).send('Username required');
  } else if (!password) {
    res.status(401).send('Password required');
  } else {
    next();
  }
}

function checkIfUserIsRegistered(req, res, next) {
  const { username, password } = req.body;

  users.getUser(username)
    .then(user => {
      if (!user) {
        res.status(403).send('User not registered');
      } else {
        // Make user object accessible to future middlewares
        req.user = user;
        next();
      }
    })
    .catch(err => {
      res.status(500).send(`There was an error logging in: ${err}`);
    });
}

function tryUserLogin(req, res, next) {
  const { username, password } = req.body;

  users.tryLoginUser(username, password)
    .then(loggedIn => {
      if (!loggedIn) {
        res.status(403).send('Incorrect Password');
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).send(`There was an error logging in: ${err}`);
    });
}

async function generateToken(req, res, next) {

  const jwtPayload = {
    iss: 'jwt_lesson_app',
    sub: {
      id: req.user.id
    },
    loggedIn: true
  };

  try {
    const token = await jwtSignAsync(jwtPayload, TOKEN_SECRET, {expiresIn: '1d'});
    req.user.token = token;
    next();
  } catch(err) {
    throw(err);
  }
}

module.exports = router;
