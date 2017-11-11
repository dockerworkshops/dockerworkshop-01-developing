const express = require('express');
const { getChannels, getChannelById } = require('../repositories/channel-repository');
const cors = require('cors');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(cors());

router.get('/', (req, res, next) => {
  getChannels()
    .then((channels) => {
      res.status(200).send(channels);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return next();
  }

  return getChannelById(id)
    .then((channel) => {
      res.status(200).send(channel);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
