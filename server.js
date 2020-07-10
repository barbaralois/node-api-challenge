const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

const projectRouter = require('./project/projectRouter.js');
const actionRouter = require('./action/actionRouter.js');

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Unit 4 Week 1 Sprint Challenge</h1>`);
});

module.exports = server;
