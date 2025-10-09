const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  if (req.url.endsWith('.css')) {
    const cssPath = path.join(__dirname, req.url);
    fs.readFile(cssPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('CSS file not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
    return;
  }

  let filePath = '';
  if (req.url === '/') filePath = path.join(__dirname, 'index.html');
  else if (req.url === '/about') filePath = path.join(__dirname, 'about.html');
  else if (req.url === '/contact') filePath = path.join(__dirname, 'contact.html');
  else filePath = path.join(__dirname, '404.html');

  fs.readFile(filePath, 'utf8', (err, pageData) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Error loading page');
    }

    fs.readFile(path.join(__dirname, 'header.html'), 'utf8', (err, headerData) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error loading header');
      }

      const finalHtml = pageData.replace('<body>', `<body>\n${headerData}`);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(finalHtml);
    });
  });

}).listen(8080, () => console.log('Server running on http://localhost:8080'));
