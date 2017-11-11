const knex = require('../knex');
const rp = require('request-promise');

function getUsers() {
  return knex('users');
}

function getUserData(slackUserId) {
  return knex('users')
    .where('user_id', slackUserId)
    .select('user_name');
}

function addUserDataFromSlack(slackUserId, token) {
  const options = {
    method: 'GET',
    uri: 'https://slack.com/api/users.info',
    qs: { user: slackUserId, token },
    json: true,
  };
  return rp(options).then(data => knex('users').insert({
    user_id: slackUserId,
    user_name: data.user.name,
    real_name: data.user.real_name,
    first_name: data.user.profile.first_name,
    last_name: data.user.profile.last_name,
    status_emoji: data.user.profile.status_emoji || '',
    image_24: data.user.profile.image_24,
    image_512: data.user.profile.image_512,
  }));
}

function addUser(userDetails) {
  return knex('users')
    .insert(userDetails)
    .catch(err => err);
}

function updateUser(slackUserId, userDetails) {
  return knex('users')
    .update(userDetails)
    .where('user_id', slackUserId)
    .catch(err => err);
}

function updateAllUserData(token) {
  const options = {
    method: 'GET',
    uri: 'https://slack.com/api/users.list',
    qs: { token },
    json: true,
  };
  return rp(options).then(data =>
    knex('users').select('user_id').then((usersData) => {
      const existingUserIds = usersData.map(userData => userData.user_id);
      const queries = data.members.map((user) => {
        const fields = {
          user_name: user.name,
          real_name: user.real_name,
          first_name: user.profile.first_name,
          last_name: user.profile.last_name,
          status_emoji: user.profile.status_emoji || '',
          image_24: user.profile.image_24,
          image_512: user.profile.image_512,
        };
        if (existingUserIds.includes(user.id)) {
          return knex('users').where({ user_id: user.id }).update(fields);
        }
        fields.user_id = user.id;
        return knex('users').insert(fields);
      });
      return Promise.all(queries);
    }),
  ).catch(err => new Error(err));
}

module.exports = { getUsers,
  getUserData,
  addUserDataFromSlack,
  addUser,
  updateUser,
  updateAllUserData,
};
