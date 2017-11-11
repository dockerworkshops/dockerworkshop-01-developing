const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const jwtSignAsync = promisify(jwt.sign);
const jwtVerifyAsync = promisify(jwt.verify);

module.exports = { jwtSignAsync, jwtVerifyAsync };
