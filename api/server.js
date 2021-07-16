// build your server here and require it from index.js
const express = require('express');
const helmet = require('helmet');
 const resourceRouter = require('./resource/router');

const server = express();

server.use(helmet());
server.use(express.json());
 server.use('/api/resources', resourceRouter);
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;