const knex = require('../knex');
const { camelizeKeys } = require('humps');

function fetchMessageBatch(channelId) {
  return knex('messages')
    .innerJoin('channels', 'messages.channel_id', 'channels.channel_id')
    .where('channels.channel_id', channelId)
    .select('messages')
    .orderBy('messages.message_id', 'desc')
    .limit(100)
    .catch(err => err);
}

function addSentimentScore(sentimentScore, magnitudeScore, channelId, numberOfMessages) {
  return knex('sentiment_scores')
    .insert(
      {
        channel_id: channelId,
        score: sentimentScore,
        magnitude: magnitudeScore,
        number_of_messages: numberOfMessages,
      },
      'sentiment_score_id',
    )
    .then(row => camelizeKeys(row))
    .catch(err => err);
}

function buildWidgetSentimentScore(sentimentScoreId) {
  return knex('sentiment_scores')
    .first()
    .select('channel_name', 'score')
    .innerJoin('channels', 'sentiment_scores.channel_id', 'channels.channel_id')
    .where('sentiment_score_id', sentimentScoreId)
    .then(row => camelizeKeys(row))
    .catch(err => err);
}

function getSentimentScoreByChannelName(channelName) {
  return knex('sentiment_scores')
    .first()
    .select('channel_name', 'score')
    .innerJoin('channels', 'sentiment_scores.channel_id', 'channels.channel_id')
    .where('channel_name', channelName)
    .then(row => camelizeKeys(row))
    .catch(err => err);
}

module.exports = {
  fetchMessageBatch,
  addSentimentScore,
  buildWidgetSentimentScore,
  getSentimentScoreByChannelName,
};
