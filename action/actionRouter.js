const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', async (req, res) => {
  // Get list of actions
});

router.get('/:id', async (req, res) => {
  // Get an action by ID
});

router.delete('/:id', async (req, res) => {
  // Delete an action by ID
});

router.put('/:id', async (req, res) => {
  // Update an action by ID
});

function validateActionId(req, res, next) {
  // Validate that an action's ID is in the server
}

module.exports = router;
