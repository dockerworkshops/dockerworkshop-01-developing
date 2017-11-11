exports.seed = knex => knex('channels').del()
  .then(() => knex('channels').insert([
    {
      channel_id: 'C6E2XMLAV',
      channel_name: 'random',
    },
    {
      channel_id: 'C6DUVSW3A',
      channel_name: 'dev',
    },
    {
      channel_id: 'C6E2XMK4H',
      channel_name: 'general',
    },
  ]));
