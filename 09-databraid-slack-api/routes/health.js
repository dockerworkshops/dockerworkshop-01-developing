const express = require('express');
const cors = require('cors');

// eslint-disable-next-line new-cap
const router = express.Router();

router.use(cors());

// This route is intended for use with a production load balancer
router.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
