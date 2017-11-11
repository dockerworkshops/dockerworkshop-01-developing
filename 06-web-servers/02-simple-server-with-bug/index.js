const http = require('http');

const server = http.createServer(handler);

server.listen(8000, printListening);

function handler(req, res) {
  res.end('This is a response from a web server.');
}

function printListening() {
  console.log('Listening on port 8000');
}
