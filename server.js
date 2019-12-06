const express = require('express');

const projectRouter = require('./routers/projectRouter.js');
const actionRouter = require('./routers/actionRouter');
const server = express();
server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server;
