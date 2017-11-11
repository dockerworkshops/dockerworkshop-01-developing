const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtVerifyAsync } = require('../utils/jsonwebTokenAsync');
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

const router = express.Router();

router.get('/', checkForToken, parseToken, verifyIsLoggedIn, (req, res) => {
  users.getNames()
    .then(names => {
      res.json(names);
    })
    .catch(err => {
      res.status(500).send(`There was an error getting user names: ${err}`);
    });
});

router.get('/:id', checkForToken, parseToken, verifyIsLoggedIn, checkForAccessToSecret, (req, res) => {
  users.getSecretFor(req.params.id)
    .then(secret => {
      res.json(secret)
    })
    .catch(err => {
      res.status(500).send(`There was an error getting the secret ${err}`);
    });
});

function checkForToken(req, res, next) {
  if (!req.headers.auth || !req.headers.auth.includes('Bearer')) {
    res.sendStatus(403);
  } else {
    next();
  }
}

function parseToken(req, res, next) {
  try {
    const token = req.headers.auth.split(' ')[1];
    req.token = token;
    next();
  } catch(err) {
    res.sendStatus(401);
  }
}

async function verifyIsLoggedIn(req, res, next) {
  try {
    const decoded = await jwtVerifyAsync(req.token, TOKEN_SECRET);
    if (!decoded.loggedIn) {
      res.sendStatus(403);
      return;
    }
    next();
  } catch(err) {
    res.sendStatus(403);
  }
}

async function checkForAccessToSecret(req, res, next) {
  try {
    const decoded = await jwtVerifyAsync(req.token, TOKEN_SECRET);
    if (!decoded.loggedIn || decoded.sub.id !== parseInt(req.params.id)) {
      res.sendStatus(403);
      return;
    }
    next();
  } catch(err) {
    res.sendStatus(403);
  }
}

module.exports = router;
