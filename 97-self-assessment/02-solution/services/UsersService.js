const knex = require('../knex');
const bcrypt = require('bcryptjs');

class UsersService {

  getNames() {
    return knex('users')
      .select('username');
  }

  getSecretFor(id) {
    return knex('users')
      .select('secret')
      .first()
      .where({id});
  }

  getUser(username) {
    return knex('users')
      .first()
      .where({username});
  }

  tryLoginUser(username, password) {
    return knex('users')
      .select('password')
      .first()
      .where({username})
      .then(queryResult => {
        if (!queryResult) return false;
        let hashedPassword = queryResult.password;
        return bcrypt.compare(password, hashedPassword);
      });
  }
}

module.exports = UsersService;
