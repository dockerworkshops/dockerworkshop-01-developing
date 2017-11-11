// NOTE: CONTENTS MOVED FROM src/slack/sentiment-event-handlers.js
// due to the additon of routes/sentiment.js -- in an attempt
// to avoid naming confusion

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('dotenv').config();
}

const Language = require('@google-cloud/language');
const {
  fetchMessageBatch,
  addSentimentScore,
  buildWidgetSentimentScore,
} = require('../../repositories/sentiment-repository');

const language = Language();

function analyzeSentimentAndSaveScore(io, channelId) {
  let numberOfMessages;

  fetchMessageBatch(channelId)
    .then((messages) => {
      const messagesArray = messages.map(msgObject => msgObject.messages);
      const messageString = messagesArray.join('\n');
      numberOfMessages = messagesArray.length;
      return messageString;
    })
    .then((messageString) => {
      const document = {
        content: messageString,
        type: 'PLAIN_TEXT',
      };
      return language.analyzeSentiment({ document });
    })
    .then((analysisResults) => {
      const sentimentScore = analysisResults[0].documentSentiment.score;
      const magnitudeScore = analysisResults[0].documentSentiment.magnitude;
      return addSentimentScore(sentimentScore, magnitudeScore, channelId, numberOfMessages);
    })
    .then(result => buildWidgetSentimentScore(result[0]))
    .then((scoreData) => {
      const newScoreData = {};
      newScoreData[scoreData.channelName] = scoreData.score;
      io.sockets.emit('score', newScoreData);
    })
    .catch(err => err);
}

module.exports = { analyzeSentimentAndSaveScore };
