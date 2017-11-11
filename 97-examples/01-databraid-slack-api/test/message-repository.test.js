/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const { getMessages,
  getMessagesByChannelName,
  updateMessage,
  deleteMessage } = require('../repositories/message-repository');
const { addDatabaseHooks } = require('./utils');

describe(
  'Message Repo getMessages',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getMessages).to.exist;
    });

    it('should be a function', () => {
      expect(getMessages).is.a('function');
    });

    it('should return an array of objects', () => {
      getMessages().then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);

describe(
  'Message Repo getMessagesByChannelName',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getMessagesByChannelName).to.exist;
    });

    it('should be a function', () => {
      expect(getMessagesByChannelName).is.a('function');
    });

    it('should return an array', () => {
      getMessagesByChannelName('dev').then((result) => {
        expect(result).to.be.a('array');
      });
    });

    it('should return an array with correct message info', () => {
      getMessagesByChannelName('dev').then((result) => {
        expect(result).to.deep.equal([
          {
            messageId: 3,
            userId: 'U6T3VM814',
            channelId: 'C6DUVSW3A',
            rawTs: '1501626043.643661',
            messageTimestamp: new Date('2017-08-01T22:20:43.643Z'),
            message: 'Happy things! Look at this message. It is sooooo cool.',
            channelName: 'dev',
            userName: 'tylerlangenbrunner',
            realName: 'Tyler Langenbrunner',
            firstName: 'Tyler',
            lastName: 'Langenbrunner',
            statusEmoji: ':slack:',
            image24:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0011-24.png',
            image512:
              'https://secure.gravatar.com/avatar/bffb6bb05942ed7400905f9ceb0f6cdf.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0011-512.png',
          },
        ]);
      });
    });
  }),
);

describe(
  'Message Repo updateMessage',
  addDatabaseHooks(() => {
    const channelId = 'C6E2XMLAV';
    const message = {
      type: 'message',
      user: 'U6FMJ3J3Z',
      text: 'Edit this message',
      edited: {
        user: 'U6FMJ3J3Z',
        ts: '1501624043.643662',
      },
      ts: '1501624043.643661',
    };

    it('should exist', () => {
      expect(updateMessage).to.exist;
    });

    it('should be a function', () => {
      expect(updateMessage).is.a('function');
    });

    it('should return with status of 1 (update successful)', () => {
      updateMessage(channelId, message).then((result) => {
        expect(result).to.equal(1);
      });
    });

    it('should return with status of 0 (update failed)', () => {
      message.ts = '1234567890.123456';
      updateMessage(channelId, message).then((result) => {
        expect(result).to.equal(0);
      });
    });
  }),
);

describe(
  'Message Repo deleteMessage',
  addDatabaseHooks(() => {
    const channelId = 'C6E2XMLAV';

    it('should exist', () => {
      expect(deleteMessage).to.exist;
    });

    it('should be a function', () => {
      expect(deleteMessage).is.a('function');
    });

    it('should return with status of 1 (delete successful)', () => {
      timestamp = '1501624043.643661';
      deleteMessage(channelId, timestamp).then((result) => {
        expect(result).to.equal(1);
      });
    });

    it('should return with status of 0 (delete failed)', () => {
      timestamp = '1234567890.123456';
      deleteMessage(channelId, timestamp).then((result) => {
        expect(result).to.equal(0);
      });
    });
  }),
);
