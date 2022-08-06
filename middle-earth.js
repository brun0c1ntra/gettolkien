const fs = require('fs');
const http = require('http');
const url = require('url');


const data = fs.readFileSync(`${__dirname}/data/quotes.json`, 'utf-8');
const quotes = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    
    res.end("The Doors of Durin, Lord of Moria. Speak, friend, and enter");

    // API
  }  
  else if (pathname.toUpperCase() === '/GETTOLKIEN') {
    
    res.writeHead(200, {
        'Content-type': 'application/json'
    });

    res.write(JSON.stringify(quotes[Math.floor(Math.random() * (quotes.length - 1) + 1)]));
    res.end();
    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    });
    res.end('<h1>"I am sorry for everything." - Bilbo Baggins</h1>');
  }
});

server.listen(8000);
