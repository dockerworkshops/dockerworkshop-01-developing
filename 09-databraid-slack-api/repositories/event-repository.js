const knex = require('../knex.js');
const { camelizeKeys } = require('humps');

function writeMessage(userId, text, rawTS, channelId) {
  if (userId && text && rawTS && channelId) {
    return knex('messages')
      .insert({
        user_id: userId,
        channel_id: channelId,
        raw_ts: rawTS,
        message_timestamp: new Date(Number.parseFloat(rawTS) * 1000),
        message: text,
      }, 'message_id')
      .then(row => camelizeKeys(row))
      .catch(err => err);
  }
  return [];
}

function buildWidgetMessage(messageId) {
  return knex('messages')
    .first()
    .innerJoin('channels', 'messages.channel_id', 'channels.channel_id')
    .innerJoin('users', 'messages.user_id', 'users.user_id')
    .where('message_id', messageId)
    .then(row => camelizeKeys(row))
    .catch(err => err);
}

module.exports = { writeMessage, buildWidgetMessage };
