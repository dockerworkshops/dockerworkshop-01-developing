const { writeMessage, buildWidgetMessage } = require('../../repositories/event-repository');
const { updateMessage, deleteMessage } = require('../../repositories/message-repository');
const { updateUser, addUser } = require('../../repositories/user-repository');
const { analyzeSentimentAndSaveScore } = require('./sentiment-event-handlers');

function handleNewMessageEvent(io, event) {
  const { user, text, ts, channel } = event;

  return writeMessage(user, text, ts, channel)
    .then(result => buildWidgetMessage(result[0]))
    .then((message) => {
      const { channelId, channelName, messageId } = message;

      const newMessage = {};
      newMessage[channelName] = {}; // Slack's channel name as key
      newMessage[channelName][messageId] = {}; // Our message ID as key
      newMessage[channelName][messageId].avatarImage = message.image24;
      newMessage[channelName][messageId].userId = message.userId;
      newMessage[channelName][messageId].name = message.realName;
      newMessage[channelName][messageId].userName = message.userName;
      newMessage[channelName][messageId].text = message.message;
      newMessage[channelName][messageId].timestamp = message.messageTimestamp;
      newMessage[channelName][messageId].channelId = channelId;

      io.sockets.emit('messages', newMessage);

      analyzeSentimentAndSaveScore(io, channelId);
    });
}

function handleEditMessageEvent(event) {
  const { channel, message } = event;

  updateMessage(channel, message);
}

function handleDeleteMessageEvent(event) {
  const { channel, deleted_ts } = event;

  deleteMessage(channel, deleted_ts);
}

function handleUserJoinedTeamEvent(event) {
  const { user } = event;

  const userDetails = {
    user_id: user.id,
    user_name: user.name,
    real_name: user.real_name,
    image_24: user.profile.image_24,
    image_512: user.profile.image_512,
  };

  addUser(userDetails);
}

function handleEditUserEvent(event) {
  const { user } = event;

  const userId = user.id;
  const userDetails = {
    user_name: user.name,
    real_name: user.real_name,
    first_name: user.profile.first_name,
    last_name: user.profile.last_name,
    status_emoji: user.profile.status_emoji,
    image_24: user.profile.image_24,
    image_512: user.profile.image_512,
  };

  updateUser(userId, userDetails);
}

module.exports = { handleNewMessageEvent,
  handleEditMessageEvent,
  handleDeleteMessageEvent,
  handleUserJoinedTeamEvent,
  handleEditUserEvent };
