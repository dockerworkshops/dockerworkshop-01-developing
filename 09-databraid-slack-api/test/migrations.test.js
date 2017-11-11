/* eslint-disable no-undef */
before(() => {
  process.env.NODE_ENV = 'test';
});

/* eslint-disable no-undef */
after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');

suite(
  'migrations',
  addDatabaseHooks(() => {
    test('users columns', (done) => {
      knex('users')
        .columnInfo()
        .then((actual) => {
          const expected = {
            user_id: {
              type: 'character varying',
              maxLength: 255,
              nullable: false,
              defaultValue: null,
            },

            user_name: {
              type: 'character varying',
              maxLength: 255,
              nullable: false,
              defaultValue: null,
            },

            real_name: {
              type: 'character varying',
              maxLength: 255,
              nullable: true,
              defaultValue: null,
            },

            first_name: {
              type: 'character varying',
              maxLength: 255,
              nullable: true,
              defaultValue: null,
            },

            last_name: {
              type: 'character varying',
              maxLength: 255,
              nullable: true,
              defaultValue: null,
            },

            status_emoji: {
              type: 'character varying',
              maxLength: 255,
              nullable: true,
              defaultValue: null,
            },

            image_24: {
              type: 'character varying',
              maxLength: 255,
              nullable: true,
              defaultValue: null,
            },

            image_512: {
              type: 'character varying',
              maxLength: 255,
              nullable: true,
              defaultValue: null,
            },
          };

          Object.keys(expected).forEach((column) => {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('channels columns', (done) => {
      knex('channels')
        .columnInfo()
        .then((actual) => {
          const expected = {
            channel_id: {
              type: 'character varying',
              maxLength: 255,
              nullable: false,
              defaultValue: null,
            },

            channel_name: {
              type: 'character varying',
              maxLength: 255,
              nullable: true,
              defaultValue: null,
            },
          };

          Object.keys(expected).forEach((column) => {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('sentiment_scores columns', (done) => {
      knex('sentiment_scores')
        .columnInfo()
        .then((actual) => {
          const expected = {
            sentiment_score_id: {
              type: 'integer',
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('sentiment_scores_sentiment_score_id_seq'::regclass)",
            },

            channel_id: {
              type: 'character varying',
              maxLength: 255,
              nullable: false,
              defaultValue: null,
            },

            score: {
              type: 'numeric',
              maxLength: null,
              nullable: false,
              defaultValue: null,
            },

            magnitude: {
              type: 'real',
              maxLength: null,
              nullable: false,
              defaultValue: null,
            },

            number_of_messages: {
              type: 'integer',
              maxLength: null,
              nullable: false,
              defaultValue: null,
            },

            created_at: {
              type: 'timestamp with time zone',
              maxLength: null,
              nullable: false,
              defaultValue: 'now()',
            },

            updated_at: {
              type: 'timestamp with time zone',
              maxLength: null,
              nullable: false,
              defaultValue: 'now()',
            },
          };

          Object.keys(expected).forEach((column) => {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('messages columns', (done) => {
      knex('messages')
        .columnInfo()
        .then((actual) => {
          const expected = {
            message_id: {
              type: 'integer',
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('messages_message_id_seq'::regclass)",
            },

            user_id: {
              type: 'character varying',
              maxLength: 255,
              nullable: false,
              defaultValue: null,
            },

            channel_id: {
              type: 'character varying',
              maxLength: 255,
              nullable: false,
              defaultValue: null,
            },

            raw_ts: {
              type: 'character varying',
              maxLength: 20,
              nullable: false,
              defaultValue: null,
            },

            message_timestamp: {
              type: 'timestamp with time zone',
              maxLength: null,
              nullable: false,
              defaultValue: null,
            },

            message: {
              type: 'text',
              maxLength: null,
              nullable: false,
              defaultValue: "''::text",
            },
          };

          Object.keys(expected).forEach((column) => {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  }),
);
