'use strict';

require('dotenv').config();

const debug = require('debug')('server:server');
const app = require('./../app');

const PORT = parseInt(process.env.PORT, 10);

const terminate = () => {
  debug('Terminating node app.');
  process.exit(0);
};

process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);

const onError = error => {
  const { syscall, port, code } = error;
  if (syscall !== 'listen') throw error;
  switch (code) {
    case 'EADDRINUSE':
      console.error(`Port ${ port } is already in use`);
      process.exit(1);
      break;
    case 'EACCES':
      console.error(`Port ${ port } requires elevated privileges`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = server => {
  const { port } = server.address();
  debug(`Node server listening on ${ port }`);
};

const initiate = () => {
  app.set('port', PORT);
  
  const server = app.listen(PORT);
  server.on('error', error => onError(error));
  server.on('listening', () => onListening(server));
};

initiate();
