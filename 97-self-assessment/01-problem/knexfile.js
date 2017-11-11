// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'users_with_secrets'
    }
  },

  docker_dev: {
    client: 'postgresql',
    connection: {
      database: 'users_with_secrets',
      user: 'postgres',
      host: process.env.DEV_DB_HOST
    }
  },

  docker_test: {
    client: 'postgresql',
    connection: {
      database: 'users_with_secrets',
      user: 'postgres',
      host: process.env.TEST_DB_HOST
    }
  }
};
