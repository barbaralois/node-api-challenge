const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
  // Get list of projects
});

router.get('/:id', async (req, res) => {
  // Get a project by ID
});

router.get('/:id/actions'),
  async (req, res) => {
    // Get actions for a specific project by ID
  };

router.post('/', async (req, res) => {
  // Post a new project
});

router.post('/:id/actions', async (req, res) => {
  // Post a new action on a specific project by ID
});

router.delete('/:id', async (req, res) => {
  // Delete a project by ID
});

router.put('/:id', async (req, res) => {
  // Update a project by ID
});

function validateProjectId(req, res, next) {
  // Validate that project ID is in the server
}

function validateProjectBody(req, res, next) {
  // Validate that req.body meets the Project requirements
}

function validateActionBody(req, res, next) {
  // Validate that req.body meets the Action requirements
}

module.exports = router;
