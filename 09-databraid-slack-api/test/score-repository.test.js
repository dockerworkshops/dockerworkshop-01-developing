/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const {
  fetchMessageBatch,
  addSentimentScore,
  buildWidgetSentimentScore,
  getSentimentScoreByChannelName,
} = require('../repositories/sentiment-repository.js');
const { addDatabaseHooks } = require('./utils');

describe(
  'fetchMessageBatch',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(fetchMessageBatch).to.exist;
    });

    it('should be a function', () => {
      expect(fetchMessageBatch).is.a('function');
    });

    it('should return an array', () => {
      fetchMessageBatch(1).then((result) => {
        expect(result).to.be.an('array');
      });
    });
  }),
);

describe(
  'addSentimentScore',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(addSentimentScore).to.exist;
    });

    it('should be a function', () => {
      expect(addSentimentScore).is.a('function');
    });

    it('should return the id number of the added score', () => {
      addSentimentScore(0.5, 30, 'C6E2XMK4H', 100).then((result) => {
        expect(result[0]).to.be.an('number');
        expect(result[1]).to.be.an('undefined');
      });
    });
  }),
);

describe(
  'buildWidgetSentimentScore',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(buildWidgetSentimentScore).to.exist;
    });

    it('should be a function', () => {
      expect(buildWidgetSentimentScore).is.a('function');
    });

    it('should return an object with the channel name and score', () => {
      buildWidgetSentimentScore(1).then((result) => {
        expect(result).to.deep.equal({
          channelName: 'general',
          score: '0.55',
        });
      });
    });
  }),
);

describe(
  'getSentimentScoreByChannelName',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getSentimentScoreByChannelName).to.exist;
    });

    it('should be a function', () => {
      expect(getSentimentScoreByChannelName).is.a('function');
    });

    it('should return an object with the channel name and score', () => {
      getSentimentScoreByChannelName('random').then((result) => {
        expect(result).to.deep.equal({
          channelName: 'random',
          score: '0.00',
        });
      });
    });
  }),
);
