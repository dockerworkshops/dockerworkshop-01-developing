/* eslint-disable no-undef, no-unused-expressions */
before(() => {
  process.env.NODE_ENV = 'test';
});

after(() => {
  process.env.NODE_ENV = 'docker_dev';
});

const expect = require('chai').expect;
const nock = require('nock');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils');
const { getChannels, getChannelById, updateAllChannelData } = require('../repositories/channel-repository');

describe(
  'Channel Repo getChannels',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getChannels).to.exist;
    });

    it('should be a function', () => {
      expect(getChannels).is.a('function');
    });

    it('should return an array of objects', () => {
      getChannels().then((result) => {
        expect(result).to.be.a('array');
      });
    });
  }),
);

describe(
  'Channel Repo getChannelById',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(getChannelById).to.exist;
    });

    it('should be a function', () => {
      expect(getChannelById).is.a('function');
    });

    it('should return an object', () => {
      getChannelById('C6E2XMK4H').then((result) => {
        expect(result).to.be.a('object');
      });
    });

    it('should return an object with channelId and channelName', () => {
      getChannelById('C6E2XMK4H').then((result) => {
        expect(result).to.deep.equal({
          channelId: 'C6E2XMK4H',
          channelName: 'general',
        });
      });
    });
  }),
);

describe(
  'Channel Repo updateAllChannelData (get all channel data from Slack)',
  addDatabaseHooks(() => {
    it('should exist', () => {
      expect(updateAllChannelData).to.exist;
    });

    it('should be a function', () => {
      expect(updateAllChannelData).is.a('function');
    });

    it('should update existing channel data and add missing channel data', () => {
      nock('https://slack.com')
        .get('/api/channels.list')
        .query({
          token: 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf129',
        })
        .reply(200, {
          ok: true,
          channels: [
            {
              id: 'C6DUVSW3A',
              name: 'devel',
              is_channel: true,
              created: 1501174942,
              creator: 'U6FMJ3J3Z',
              is_archived: false,
              is_general: false,
              unlinked: 0,
              name_normalized: 'devel',
              is_shared: false,
              is_org_shared: false,
              is_member: true,
              is_private: false,
              is_mpim: false,
              members: [
                'U6FMJ3J3Z',
                'U6SHV2R5L',
                'U6SPRFYLX',
                'U6T3VM814',
                'U6ZU02JE6',
              ],
              topic: {
                value: 'edit topic',
                creator: 'U6SPRFYLX',
                last_set: 1505348002,
              },
              purpose: {
                value: '',
                creator: '',
                last_set: 0,
              },
              previous_names: [

              ],
              num_members: 5,
            },
            {
              id: 'C6DUVSW3D',
              name: 'hacking',
              is_channel: true,
              created: 1501174952,
              creator: 'U6FMJ3J3Z',
              is_archived: false,
              is_general: false,
              unlinked: 0,
              name_normalized: 'hacking',
              is_shared: false,
              is_org_shared: false,
              is_member: true,
              is_private: false,
              is_mpim: false,
              members: [
                'U6FMJ3J3Z',
                'U6SHV2R5L',
                'U6SPRFYLX',
              ],
              topic: {
                value: 'edit topic',
                creator: 'U6SPRFYLX',
                last_set: 1505348012,
              },
              purpose: {
                value: '',
                creator: '',
                last_set: 0,
              },
              previous_names: [

              ],
              num_members: 3,
            },
          ],
        });

      const token = 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf129';
      updateAllChannelData(token)
        .then(() => {
          knex('channels').where({ channel_id: 'C6DUVSW3A' }).select('channel_name')
            .then((result) => {
              expect(result).to.deep.equal([{ channel_name: 'devel' }]);
            });
        })
        .then(() => {
          knex('channels').where({ channel_id: 'C6DUVSW3D' }).select('channel_name')
            .then((result) => {
              expect(result).to.deep.equal([{ channel_name: 'hacking' }]);
            });
        });
    });

    it('should handle errors when getting channel data', () => {
      nock('https://slack.com')
        .get('/api/channels.list')
        .query({
          token: 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf130',
        })
        .reply(200, {
          error: 'invalid_auth',
          ok: false,
        });

      const token = 'xoxp-218630306018-230609873190-230462324853-fc311e59fb6a01910e5012ba22caf130';
      updateAllChannelData(token)
        .then((result) => {
          expect(result).to.be.an('error');
        });
    });
  }),
);
