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
  'seeds',
  addDatabaseHooks(() => {
    test('users rows', (done) => {
      knex('users')
        .then((actual) => {
          const expected = [
            {
              user_id: 'U6FMJ3J3Z',
              user_name: 'dave.gallup',
              real_name: 'Dave Gallup',
              first_name: 'Dave',
              last_name: 'Gallup',
              status_emoji: ':slack:',
              image_24:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
              image_512:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
            },
            {
              user_id: 'U6KESJ1BN',
              user_name: 'meghanprestemon',
              real_name: 'Meghan Prestemon',
              first_name: 'Meghan',
              last_name: 'Prestemon',
              status_emoji: ':slack:',
              image_24:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
              image_512:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
            },
            {
              user_id: 'U6T3VM814',
              user_name: 'tylerlangenbrunner',
              real_name: 'Tyler Langenbrunner',
              first_name: 'Tyler',
              last_name: 'Langenbrunner',
              status_emoji: ':slack:',
              image_24:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
              image_512:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
            },
            {
              user_id: 'U6SPRFYLX',
              user_name: 'kurtishouser',
              real_name: 'Kurtis Houser',
              first_name: 'Kurtis',
              last_name: 'Houser',
              status_emoji: ':slack:',
              image_24:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
              image_512:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
            },
            {
              user_id: 'U6SHV2R5L',
              user_name: 'johanbmk',
              real_name: 'Johan Brattemark',
              first_name: 'Johan',
              last_name: 'Brattemark',
              status_emoji: ':slack:',
              image_24:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
              image_512:
                'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('channels rows', (done) => {
      knex('channels')
        .then((actual) => {
          const expected = [
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
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('sentiment_scores rows', (done) => {
      knex('sentiment_scores')
        .orderBy('sentiment_score_id', 'ASC')
        .then((actual) => {
          const expected = [
            {
              sentiment_score_id: 1,
              channel_id: 'C6E2XMK4H',
              score: '0.55',
              magnitude: 30,
              number_of_messages: 100,
              created_at: new Date('2017-07-31 14:26:16 UTC'),
              updated_at: new Date('2017-07-31 14:26:16 UTC'),
            },
            {
              sentiment_score_id: 2,
              channel_id: 'C6E2XMK4H',
              score: '-0.50',
              magnitude: 32,
              number_of_messages: 100,
              created_at: new Date('2017-07-31 14:26:16 UTC'),
              updated_at: new Date('2017-07-31 14:26:16 UTC'),
            },
            {
              sentiment_score_id: 3,
              channel_id: 'C6DUVSW3A',
              score: '0.02',
              magnitude: 15,
              number_of_messages: 100,
              created_at: new Date('2017-07-31 14:26:16 UTC'),
              updated_at: new Date('2017-07-31 14:26:16 UTC'),
            },
            {
              sentiment_score_id: 4,
              channel_id: 'C6E2XMLAV',
              score: '0.00',
              magnitude: 10,
              number_of_messages: 100,
              created_at: new Date('2017-07-31 14:26:16 UTC'),
              updated_at: new Date('2017-07-31 14:26:16 UTC'),
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test('messages rows', (done) => {
      knex('messages')
        .orderBy('message_id', 'ASC')
        .then((actual) => {
          const expected = [
            {
              message_id: 1,
              user_id: 'U6FMJ3J3Z',
              channel_id: 'C6E2XMLAV',
              raw_ts: '1501624043.643661',
              message_timestamp: new Date(1501624043.643661 * 1000),
              message: 'Nice work! We have 5 PRs and 3 trello tasks completed already today, Nice!',
            },
            {
              message_id: 2,
              user_id: 'U6KESJ1BN',
              channel_id: 'C6E2XMLAV',
              raw_ts: '1501625043.643661',
              message_timestamp: new Date(1501625043.643661 * 1000),
              message: 'This is a great new message. This is different than the last message.',
            },
            {
              message_id: 3,
              user_id: 'U6T3VM814',
              channel_id: 'C6DUVSW3A',
              raw_ts: '1501626043.643661',
              message_timestamp: new Date(1501626043.643661 * 1000),
              message: 'Happy things! Look at this message. It is sooooo cool.',
            },
            {
              message_id: 4,
              user_id: 'U6SPRFYLX',
              channel_id: 'C6E2XMK4H',
              raw_ts: '1501627043.643661',
              message_timestamp: new Date(1501627043.643661 * 1000),
              message: 'I am trying to make a decent amount of messages.',
            },
            {
              message_id: 5,
              user_id: 'U6SHV2R5L',
              channel_id: 'C6E2XMK4H',
              raw_ts: '1501628043.643661',
              message_timestamp: new Date(1501628043.643661 * 1000),
              message: "I've been in merge conflict hell all day.",
            },
          ];

          expected.forEach((row, i) => {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          });

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  }),
);
