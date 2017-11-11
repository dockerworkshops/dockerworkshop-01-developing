const knex = require('../knex.js');
const rp = require('request-promise');
const { camelizeKeys } = require('humps');

function getChannels() {
  return knex('channels')
    .orderBy('channel_name')
    .then(result => camelizeKeys(result));
}

function getChannelById(id) {
  return knex('channels')
    .where('channel_id', id)
    .first()
    .then(result => camelizeKeys(result));
}

function updateAllChannelData(token) {
  const options = {
    method: 'GET',
    uri: 'https://slack.com/api/channels.list',
    qs: { token },
    json: true,
  };
  return rp(options).then(data =>
    knex('channels').select('channel_id').then((channelsData) => {
      const existingChannelIds = channelsData.map(channelData => channelData.channel_id);
      const queries = data.channels.map((channel) => {
        const fields = {
          channel_name: channel.name,
        };
        if (existingChannelIds.includes(channel.id)) {
          return knex('channels').where({ channel_id: channel.id }).update(fields);
        }
        fields.channel_id = channel.id;
        return knex('channels').insert(fields);
      });
      return Promise.all(queries);
    }),
  ).catch(err => new Error(err));
}


module.exports = { getChannels, getChannelById, updateAllChannelData };
