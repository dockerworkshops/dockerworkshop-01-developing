const express = require('express');

const app = express();

app.use((req, res) => {
  res.send(`Response to ${req.method} ${req.path} from express server.`);
});

app.listen(8000, () => console.log('Express server listening on port 8000'));
