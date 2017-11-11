module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'slack_test',
      user: 'postgres',
      host: 'postgres',
    },
  },

  docker_dev: {
    client: 'postgresql',
    connection: {
      database: 'slack_test',
      user: 'postgres',
      host: 'postgres',
    },
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'slack_test',
      user: 'postgres',
      host: 'postgres',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  },
};

