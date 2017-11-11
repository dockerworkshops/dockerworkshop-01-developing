/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { writeMessage, buildWidgetMessage } = require('../repositories/event-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Event Repo writeMessage',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(writeMessage).to.exist;
    });

    it('should be a function', () => {
      expect(writeMessage).is.a('function');
    });

    it('should return an array', () => {
      writeMessage(
        'U6KESJ1BN',
        'This is a great new message. This is different than the last message.',
        '1501625043.643661',
        'C6E2XMLAV',
      ).then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);

describe(
  'Event Repo buildWidgetMessage',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(buildWidgetMessage).to.exist;
    });

    it('should be a function', () => {
      expect(buildWidgetMessage).is.a('function');
    });

    it('should return an object with correct message', () => {
      buildWidgetMessage(1).then((result) => {
        expect(result).to.deep.equal({
          messageId: 1,
          userId: 'U6FMJ3J3Z',
          channelId: 'C6E2XMLAV',
          rawTs: '1501624043.643661',
          messageTimestamp: new Date('2017-08-01T21:47:23.643Z'),
          message: 'Nice work! We have 5 PRs and 3 trello tasks completed already today, Nice!',
          channelName: 'random',
          userName: 'dave.gallup',
          realName: 'Dave Gallup',
          firstName: 'Dave',
          lastName: 'Gallup',
          statusEmoji: ':slack:',
          image24:
            'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
          image512:
            'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
        });
      });
    });
  }),
);
