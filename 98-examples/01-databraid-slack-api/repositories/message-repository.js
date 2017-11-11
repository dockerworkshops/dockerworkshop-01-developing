const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function getMessages() {
  return knex('messages')
    .orderBy('message_id')
    .then(result => camelizeKeys(result));
}

function getMessagesByChannelName(channelName) {
  return knex('messages')
    .innerJoin('channels', 'messages.channel_id', 'channels.channel_id')
    .innerJoin('users', 'messages.user_id', 'users.user_id')
    .where('channel_name', channelName)
    .then(row => camelizeKeys(row))
    .catch(err => err);
}

function updateMessage(channelId, message) {
  return knex('messages')
    .where({ channel_id: channelId, raw_ts: message.ts })
    .update({ message: message.text })
    .catch(e => e);
}

function deleteMessage(channelId, timestamp) {
  return knex('messages')
    .where({ channel_id: channelId, raw_ts: timestamp })
    .del()
    .catch(e => e);
}

module.exports = { getMessages,
  getMessagesByChannelName,
  updateMessage,
  deleteMessage };
