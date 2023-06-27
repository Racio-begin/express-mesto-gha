const http = require('http');

// eslint-disable-next-line no-unused-vars
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf8',
  });
  res.end('<h1>Привет, мир!</h1>', 'utf8');
});
