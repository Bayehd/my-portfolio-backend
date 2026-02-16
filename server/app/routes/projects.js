const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');

// get all projects
router.get('/', projectsController.getAll);

// get projects by id
router.get('/:id', projectsController.getById);

// add new project
router.post('/', projectsController.add);

// update project by id
router.put('/:id', projectsController.update);

// remove project by id
router.delete('/:id', projectsController.delete);

module.exports = router;