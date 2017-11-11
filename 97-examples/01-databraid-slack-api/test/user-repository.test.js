/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const nock = require('nock');
const knex = require('../knex');
const { getUsers,
  getUserData,
  addUserDataFromSlack,
  addUser,
  updateUser,
  updateAllUserData } = require('../repositories/user-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'User Repo getUsers (all users)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getUsers).to.exist;
    });

    it('should be a function', () => {
      expect(getUsers).is.a('function');
    });

    it('should return an array', () => {
      getUsers().then((result) => {
        expect(result).to.be.an('array');
      });
    });

    it('should return an array with correct users', () => {
      getUsers().then((result) => {
        expect(result).to.deep.equal([
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
        ]);
      });
    });
  }),
);

describe(
  'User Repo getUserData (one user)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getUserData).to.exist;
    });

    it('should be a function', () => {
      expect(getUserData).is.a('function');
    });

    it('should return an array', () => {
      getUserData('U6SHV2R5L').then((result) => {
        expect(result).to.be.an('array');
      });
    });

    it('should return an array with correct user', () => {
      getUserData('U6SHV2R5L').then((result) => {
        expect(result).to.deep.equal([{ user_name: 'johanbmk' }]);
      });
    });
  }),
);

describe(
  'User Repo addUserDataFromSlack (one user)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(addUserDataFromSlack).to.exist;
    });

    it('should be a function', () => {
      expect(addUserDataFromSlack).is.a('function');
    });

    it('should put user id and name in database', () => {
      nock('https://slack.com')
        .get('/api/users.info')
        .query({
          user: 'ABC123DEF',
          token: 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf129',
        })
        .reply(200, {
          ok: true,
          user: {
            id: 'ABC123DEF',
            team_id: 'T6EJM120J',
            name: 'johndoe',
            real_name: 'John Doe',
            profile: {
              first_name: 'John',
              last_name: 'Doe',
              image_24: 'https://secure.gravatar.com/avatar/12345.png',
              image_512: 'https://secure.gravatar.com/avatar/12346.png',
            },
          },
        });

      const slackUserId = 'ABC123DEF';
      const token = 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf129';
      addUserDataFromSlack(slackUserId, token)
        .then(() =>
          knex('users').where({ user_id: slackUserId }).select('user_name')
            .then((result) => {
              expect(result).to.deep.equal([{ user_name: 'johndoe' }]);
            }));
    });
  }),
);

describe(
  'User Repo addUser',
  addDatabaseHooks(() => {
    const userDetails = {
      user_id: 'N1NINCHNLZ',
      user_name: 'trentreznor',
      real_name: 'Trent Reznor',
      image_24:
        'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
      image_512:
        'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
    };

    it('should exist', () => {
      expect(addUser).to.exist;
    });

    it('should be a function', () => {
      expect(addUser).is.a('function');
    });

    it('should return with rowCount of 1 (insert successful)', () => {
      addUser(userDetails).then((result) => {
        expect(result.rowCount).to.equal(1);
      });
    });
  }),
);

describe(
  'User Repo updateUser',
  addDatabaseHooks(() => {
    let userId = 'U6SPRFYLX';
    const userDetails = {
      user_name: 'kurtishouser',
      real_name: 'Dunder Dog',
      first_name: 'Dunder',
      last_name: 'Dog',
      status_emoji: ':hankey:',
      image_24: 'https://avatars.slack-edge.com/2017-09-12/239659401761_76f89c2470ff018b03dd_24.jpg',
      image_512: 'https://avatars.slack-edge.com/2017-09-12/239659401761_76f89c2470ff018b03dd_512.jpg',
    };

    it('should exist', () => {
      expect(updateUser).to.exist;
    });

    it('should be a function', () => {
      expect(updateUser).is.a('function');
    });

    it('should return with status of 1 (update successful)', () => {
      updateUser(userId, userDetails).then((result) => {
        expect(result).to.equal(1);
      });
    });

    it('should return with status of 0 (update failed)', () => {
      userId = 'ABC123DEF';
      updateUser(userId, userDetails).then((result) => {
        expect(result).to.equal(0);
      });
    });
  }),
);

describe(
  'User Repo updateAllUserData (get all users from Slack)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(updateAllUserData).to.exist;
    });

    it('should be a function', () => {
      expect(updateAllUserData).is.a('function');
    });

    it('should update existing user data and add missing user data', () => {
      nock('https://slack.com')
        .get('/api/users.list')
        .query({
          token: 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf129',
        })
        .reply(200, {
          ok: true,
          members: [
            {
              id: 'U6SHV2R5L',
              team_id: 'T6EJM120J',
              name: 'johanbmk',
              deleted: false,
              real_name: 'Johan Brattemark',
              profile: {
                first_name: 'Johan',
                last_name: 'bmk',
                real_name: 'Johan Brattemark',
                display_name: 'johanbmk',
                real_name_normalized: 'Johan Brattemark',
                display_name_normalized: 'johanbmk',
                image_24: 'https://secure.gravatar.com/avatar/1234.jpg',
                image_512: 'https://secure.gravatar.com/avatar/5678.jpg',
              },
            },
            {
              id: 'U6JHU2R5L',
              team_id: 'T6EJM120J',
              name: 'fzappa',
              deleted: false,
              real_name: 'Frank Zappa',
              profile: {
                first_name: 'Frank',
                last_name: 'Zappa',
                real_name: 'Frank Zappa',
                display_name: 'fzappa',
                real_name_normalized: 'Frank Zappa',
                display_name_normalized: 'fzappa',
                image_24: 'https://secure.gravatar.com/avatar/9fe67a2852c0fff.jpg',
                image_512: 'https://secure.gravatar.com/avatar/9ee4ea282c0fff.jpg',
              },
            },
            {
              id: 'U6ZU12JE6',
              team_id: 'T6EJM120J',
              name: 'billy',
              deleted: false,
              real_name: 'Billy Gibbons',
              profile: {
                first_name: 'Billy',
                last_name: 'Gibbons',
                real_name: 'Billy Gibbons',
                display_name: 'billy',
                real_name_normalized: 'Billy Gibbons',
                display_name_normalized: 'billy',
                image_24: 'https://secure.gravatar.com/avatar/b0c84ffc457e13a.jpg',
                image_512: 'https://secure.gravatar.com/avatar/5ab01ff57ed13a.jpg',
                team: 'T6EJM120J',
              },
            },
          ],
          cache_ts: 1505252042,
        });

      const token = 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf129';
      updateAllUserData(token)
        .then(() => {
          knex('users').where({ user_id: 'U6SHV2R5L' }).select('last_name')
            .then((result) => {
              expect(result).to.deep.equal([{ last_name: 'bmk' }]);
            });
        })
        .then(() => {
          knex('users').where({ user_id: 'U6ZU12JE6' }).select('first_name')
            .then((result) => {
              expect(result).to.deep.equal([{ first_name: 'Billy' }]);
            });
        });
    });

    it('should handle errors when getting user data', () => {
      nock('https://slack.com')
        .get('/api/users.list')
        .query({
          token: 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf130',
        })
        .reply(200, {
          error: 'invalid_auth',
          ok: false,
        });

      const token = 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf130';
      updateAllUserData(token)
        .then((result) => {
          expect(result).to.be.an('error');
        });
    });
  }),
);
