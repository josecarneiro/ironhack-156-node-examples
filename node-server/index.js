const http = require('http');

const server = http.createServer((request, response) => {
  console.log('Got a request!');

  console.log('URL: ', request.url);
  console.log('Method: ', request.method);
  console.log('HTTP Version: ', request.httpVersion);
  
  switch (request.url) {
    case '/':
      response.write('Hello World.');
      response.end();
      break;
    case '/about':
      response.write('I\'m a human. I promise.');
      response.end();
      break;
    default:
      response.statusCode = 404;
      response.write('There was an error loading that page.');
      response.end();
  }
}); 

server.listen(3000);
