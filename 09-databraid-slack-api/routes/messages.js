const express = require('express');
const { getMessages, getMessagesByChannelName } = require('../repositories/message-repository');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res, next) => {
  getMessages()
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:channelName', (req, res, next) => {
  getMessagesByChannelName(req.params.channelName)
    .then((messages) => {
      const tailoredMessages = messages.map((msgObj) => {
        const msg = {};
        msg.messageId = msgObj.messageId;
        msg.avatarImage = msgObj.image24;
        msg.name = msgObj.realName;
        msg.userName = msgObj.userName;
        msg.text = msgObj.message;
        msg.timestamp = msgObj.messageTimestamp;
        msg.rawTimestamp = msgObj.rawTs;
        msg.channelName = msgObj.channelName;
        msg.statusEmoji = msgObj.statusEmoji;
        return msg;
      });

      return res.status(200).send(tailoredMessages);
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
