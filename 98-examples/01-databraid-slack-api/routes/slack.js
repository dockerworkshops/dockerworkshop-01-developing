const express = require('express');
const request = require('request');
const { setOption } = require('../repositories/option-repository');
const { updateAllUserData } = require('../repositories/user-repository.js');
const { updateAllChannelData } = require('../repositories/channel-repository');
const { handleNewMessageEvent,
  handleEditMessageEvent,
  handleDeleteMessageEvent,
  handleEditUserEvent,
  handleUserJoinedTeamEvent } = require('../src/slack/message-event-handlers');
const cors = require('cors');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(cors());

router.get('/auth/redirect', (req, res) => {
  // This gets hit after click event to log in, and the slack 'app' sends back a code
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env
      .SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}`,
    method: 'GET',
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      res
        .send(`Error encountered: \n${JSON.stringify(JSONresponse)}`)
        .status(200)
        .end();
    } else {
      setOption('oauth_token', JSONresponse.access_token);
      updateAllUserData(JSONresponse.access_token);
      updateAllChannelData(JSONresponse.access_token);
      res.redirect('/');
    }
  });
});

router.get('/auth', (req, res) => {
  const buttonHTML = `<a href="https://slack.com/oauth/authorize?scope=channels:history,reactions:read,users:read&client_id=${process
    .env.SLACK_CLIENT_ID}&redirect_uri=${process.env
    .REDIRECT_URI}"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>`;
  return res.send(buttonHTML);
});

function setEvents(io) {
  // This gets hit after a message is sent inside the literal slack app
  // and picked up by the slack 'app' (https://api.slack.com/apps/Databraid_Slack_App)

  router.post('/events', (req, res) => {
    if (req.body.type && req.body.type === 'url_verification') {
      res.set({ 'Content-Type': 'text/plain' });
      res.status(200).send(req.body.challenge);
      return;
    }

    if (req.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
      const { event } = req.body;

      switch (event.type) {
        case 'message':
          if (!event.subtype) { // message posted
            handleNewMessageEvent(io, event);
          } else if (event.subtype === 'message_changed') { // message edited
            handleEditMessageEvent(event);
          } else if (event.subtype === 'message_deleted') { // message deleted
            handleDeleteMessageEvent(event);
          }
          break;

        case 'user_change':
          handleEditUserEvent(event);
          break;

        case 'team_join':
          handleUserJoinedTeamEvent(event);
          break;

        default:
        // for now, ignore any messages not handled by the case conditions
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
    }
  });
}

module.exports = { router, setEvents };
