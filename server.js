const express = require('express');

const server = express();

server.use(express.json());

const projectRouter = require('./project/projectRouter.js');
const actionRouter = require('./action/actionRouter.js');

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Unit 4 Week 1 Sprint Challenge</h1>`);
});
