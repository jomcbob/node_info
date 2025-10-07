const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
  const url = req.url;
  let filePath = '';

  if (url === '/') {
    filePath = './index.html';
  } else if (url === '/about') {
    filePath = './about.html';
  } else if (url === '/contact') {
    filePath = './contact.html';
  } else {
    filePath = './404.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading file.');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}).listen(8080, function () {
  console.log("server start at port 8080");
});
