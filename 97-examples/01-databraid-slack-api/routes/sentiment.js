const express = require('express');
const { getSentimentScoreByChannelName } = require('../repositories/sentiment-repository');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/:channelName', (req, res, next) => {
  getSentimentScoreByChannelName(req.params.channelName)
    .then((scoreDataFromDB) => {
      const scoreData = {};
      scoreData[scoreDataFromDB.channelName] = scoreDataFromDB.score;

      return res.status(200).send(scoreData);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
