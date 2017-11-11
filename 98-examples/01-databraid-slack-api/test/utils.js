const knex = require('../knex');

// add knex database hooks to a test suite to tear down and build back
// up the database on each test in test suite.
const addDatabaseHooks = func => (...args) => {
  /* eslint-disable no-undef */
  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .finally(() => {
        done();
      });
  });

  /* eslint-disable no-undef */
  afterEach((done) => {
    knex.migrate.rollback()
      .finally(() => {
        done();
      });
  });

  return func(...args);
};

module.exports = {
  addDatabaseHooks,
};
