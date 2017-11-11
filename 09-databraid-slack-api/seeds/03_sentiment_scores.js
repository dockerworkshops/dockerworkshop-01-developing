exports.seed = knex =>
  knex('sentiment_scores')
    .del()
    .then(() =>
      knex('sentiment_scores').insert([
        {
          sentiment_score_id: 1,
          channel_id: 'C6E2XMK4H',
          score: 0.55,
          magnitude: 30,
          number_of_messages: 100,
          created_at: new Date('2017-07-31 14:26:16 UTC'),
          updated_at: new Date('2017-07-31 14:26:16 UTC'),
        },
        {
          sentiment_score_id: 2,
          channel_id: 'C6E2XMK4H',
          score: -0.5,
          magnitude: 32,
          number_of_messages: 100,
          created_at: new Date('2017-07-31 14:26:16 UTC'),
          updated_at: new Date('2017-07-31 14:26:16 UTC'),
        },
        {
          sentiment_score_id: 3,
          channel_id: 'C6DUVSW3A',
          score: 0.02,
          magnitude: 15,
          number_of_messages: 100,
          created_at: new Date('2017-07-31 14:26:16 UTC'),
          updated_at: new Date('2017-07-31 14:26:16 UTC'),
        },
        {
          sentiment_score_id: 4,
          channel_id: 'C6E2XMLAV',
          score: 0.0,
          magnitude: 10,
          number_of_messages: 100,
          created_at: new Date('2017-07-31 14:26:16 UTC'),
          updated_at: new Date('2017-07-31 14:26:16 UTC'),
        },
      ]),
    )
    .then(() =>
      knex.raw(
        "SELECT setval('sentiment_scores_sentiment_score_id_seq', (SELECT MAX(sentiment_score_id) FROM sentiment_scores))",
      ),
    );
