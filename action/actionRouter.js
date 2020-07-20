const express = require('express');

const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.use('/:id', validateActionId);

router.get('/', async (req, res) => {
  // Get list of all actions
  try {
    let allActions = await Actions.get();
    res.status(200).json(allActions);
  } catch {
    res.status(500).json({ message: 'There was an error retrieving actions.' });
  }
});

router.get('/:id', async (req, res) => {
  // Get an action by ID
  try {
    let requested = await Actions.get(req.action.id);
    res.status(200).json(requested);
  } catch {
    res
      .status(500)
      .json({ message: 'The action information could not be retrieved.' });
  }
});

router.delete('/:id', async (req, res) => {
  // Delete an action by ID
  try {
    await Actions.remove(req.action.id);
    res.status(200).json({ message: 'The action has been deleted.' });
  } catch {
    res
      .status(500)
      .json({ message: 'There was an error deleting the action.' });
  }
});

router.put('/:id', async (req, res) => {
  // Update an action by ID
  try {
    await Actions.update(req.action.id, req.body);
    res.status(200).json({ message: 'The action has been updated.' });
  } catch {
    res
      .status(500)
      .json({ message: 'There was an error modifying the action.' });
  }
});

function validateActionId(req, res, next) {
  const id = req.params.id;
  Actions.get(id)
    .then((actionId) => {
      if (actionId) {
        req.action = actionId;
        next();
      } else {
        res.status(404).json({
          message: 'There is not an action with that ID.',
        });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: 'There was an error validating the ID.' })
    );
}

module.exports = router;
