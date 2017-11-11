/* eslint-disable no-undef, no-unused-expressions */
const expect = require('chai').expect;
const { analyzeSentimentAndSaveScore } = require('../src/slack/sentiment-event-handlers.js');

describe('analyzeSentimentAndSaveScore', () => {
  it('should exist', () => {
    expect(analyzeSentimentAndSaveScore).to.exist;
  });

  it('should be a function', () => {
    expect(analyzeSentimentAndSaveScore).is.a('function');
  });
});
