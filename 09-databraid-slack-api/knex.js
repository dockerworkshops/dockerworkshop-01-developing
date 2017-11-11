const knex = require('knex');

const environment = process.env.NODE_ENV || 'test';
const config = require('./knexfile')[environment];

module.exports = knex(config);
