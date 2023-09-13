const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080;

let page404;
fs.readFile('404.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  page404 = data;
});

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'image/x-icon')
    res.end();
    console.log('favicon requested');
    return;
  }

  const q = new URL(req.url, `http://${req.headers.host}/`);
  const fileName = q.pathname === "/" ? 'index.html' : q.pathname.slice(1) + ".html";

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.write(page404);
      return res.end();
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
    return res.end();
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});