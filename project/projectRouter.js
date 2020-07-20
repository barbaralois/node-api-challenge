const express = require('express');

const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');

const router = express.Router();

router.use('/:id', validateProjectId);

router.get('/', async (req, res) => {
  // Get a list of all projects
  try {
    let allProjects = await Projects.get();
    res.status(200).json(allProjects);
  } catch {
    res
      .status(500)
      .json({ messsage: 'There was an issue retrieving the projects.' });
  }
});

router.get('/:id', async (req, res) => {
  // Get a project by ID
  try {
    let requested = await Projects.get(req.project.id);
    res.status(200).json(requested);
  } catch {
    res
      .status(500)
      .json({ message: 'The project information could not be retrieved' });
  }
});

router.get('/:id/actions', async (req, res) => {
  // Get a list of actions on a project
  try {
    let actions = await Projects.getProjectActions(req.project.id);
    res.status(200).json(actions);
  } catch {
    res.status(500).json({
      message: 'The actions for this project could not be retrieved.',
    });
  }
});

router.post('/', validateProjectBody, async (req, res) => {
  // Post a new project
  const newProject = req.body;
  try {
    await Projects.insert(newProject);
    res.status(201).json(newProject);
  } catch {
    res.status(500).json({
      message: 'There was an error saving the project to the database.',
    });
  }
});

router.post('/:id/actions', validateActionBody, async (req, res) => {
  // Post a new action on a specific project by ID
  const newAction = req.body;
  newAction.project_id = req.project.id;
  try {
    await Actions.insert(newAction);
    res.status(201).json(newAction);
  } catch {
    res.status(500).json({
      message: 'There was an error saving the action to the database.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a project by ID
  try {
    await Projects.remove(req.project.id);
    res.status(200).json({ message: 'The project has been deleted.' });
  } catch {
    res
      .status(500)
      .json({ message: 'There was an error deleting the project.' });
  }
});

router.put('/:id', async (req, res) => {
  // Update a project by ID
  try {
    await Projects.update(req.project.id, req.body);
    res.status(200).json({ message: 'The project has been updated.' });
  } catch {
    res.status(500).json({
      message: 'There was an error modifying the project information.',
    });
  }
});

// middleware validation functions

function validateProjectId(req, res, next) {
  const id = req.params.id;
  Projects.get(id)
    .then((projectId) => {
      if (projectId) {
        req.project = projectId;
        next();
      } else {
        res.status(404).json({ message: 'There is no project with that ID.' });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: 'There was an error validating the project ID.' })
    );
}

function validateProjectBody(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: 'The project information is missing.' });
  } else if (!body.name) {
    res
      .status(400)
      .json({ message: 'Please include a name for your project.' });
  } else if (!body.description) {
    res
      .status(400)
      .json({ message: 'Please include a description for your project.' });
  } else {
    next();
  }
}

function validateActionBody(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: 'The action information is missing.' });
  } else if (!body.description) {
    res
      .status(400)
      .json({ message: 'Please include a description of this action.' });
  } else if (!body.notes) {
    res.status(400).json({
      message:
        'Please include any additional comments or requirements for this action in the notes.',
    });
  } else {
    next();
  }
}

module.exports = router;
