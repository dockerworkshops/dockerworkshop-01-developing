exports.seed = knex => knex('options').del()
  .then(() => knex('options').insert([
    {
      option_name: 'oauth_token',
      option_value: 'abcdef',
    },
  ]));
