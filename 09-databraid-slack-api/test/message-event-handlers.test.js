/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { handleNewMessageEvent,
  handleEditMessageEvent,
  handleDeleteMessageEvent,
  handleUserJoinedTeamEvent,
  handleEditUserEvent } = require('../src/slack/message-event-handlers');
const userRepository = require('../repositories/user-repository');


describe('Slack message event handlers', () => {
  describe('handleNewMessageEvent()', () => {
    it('should be a function', () => {
      expect(handleNewMessageEvent).is.a('function');
    });
  });

  describe('handleEditMessageEvent()', () => {
    it('should be a function', () => {
      expect(handleEditMessageEvent).is.a('function');
    });
  });

  describe('handleDeleteMessageEvent()', () => {
    it('should be a function', () => {
      expect(handleDeleteMessageEvent).is.a('function');
    });
  });

  describe('handleUserJoinedTeamEvent()', () => {
    const event = {
      type: 'team_join',
      user: {
        id: '1234ABCDE',
        team_id: '1234ABCDE',
        name: 'dunderdog',
        deleted: false,
        color: '684b6c',
        real_name: 'Dunder Dog',
        tz: 'America/Los_Angeles',
        tz_label: 'Pacific Daylight Time',
        tz_offset: -25200,
        profile: {
          real_name: 'Dunder Dog',
          display_name: 'dunderdog',
          avatar_hash: 'a1234b5678c',
          title: '',
          real_name_normalized: 'Dunder Dog',
          display_name_normalized: 'dunderdog',
          image_24: 'https://secure.gravatar.com/avatar/130cb1346b35e9014f1e8f59e0f25a77.jpg?s=24&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0022-24.png',
          image_32: 'https://secure.gravatar.com/avatar/130cb1346b35e9014f1e8f59e0f25a77.jpg?s=32&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0022-32.png',
          image_48: 'https://secure.gravatar.com/avatar/130cb1346b35e9014f1e8f59e0f25a77.jpg?s=48&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0022-48.png',
          image_72: 'https://secure.gravatar.com/avatar/130cb1346b35e9014f1e8f59e0f25a77.jpg?s=72&d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0022-72.png',
          image_192: 'https://secure.gravatar.com/avatar/130cb1346b35e9014f1e8f59e0f25a77.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0022-192.png',
          image_512: 'https://secure.gravatar.com/avatar/130cb1346b35e9014f1e8f59e0f25a77.jpg?s=512&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0022-512.png',
          fields: null,
          team: '1234ABCDE',
        },
        is_admin: false,
        is_owner: false,
        is_primary_owner: false,
        is_restricted: false,
        is_ultra_restricted: false,
        is_bot: false,
        updated: 1505336886,
        is_app_user: false,
        presence: 'away',
      },
      cache_ts: 1505336886,
      event_ts: '1505336886.000484',
    };

    const { user } = event;

    const userDetails = {
      user_id: user.id,
      user_name: user.name,
      real_name: user.real_name,
      image_24: user.profile.image_24,
      image_512: user.profile.image_512,
    };

    it('should be a function', () => {
      expect(handleUserJoinedTeamEvent).is.a('function');
    });

    it('should call addUser() with correct arguments', () => {
      const addUserStub = sinon.stub(userRepository, 'addUser');
      const proxy = proxyquire('../src/slack/message-event-handlers',
        { userRepository: { addUser: addUserStub } });

      addUserStub.withArgs(event).resolves(null);
      proxy.handleUserJoinedTeamEvent(event);
      sinon.assert.calledWithMatch(addUserStub, userDetails);
      userRepository.addUser.restore();
    });
  });

  describe('handleEditUserEvent()', () => {
    it('should be a function', () => {
      expect(handleEditUserEvent).is.a('function');
    });
  });
});
