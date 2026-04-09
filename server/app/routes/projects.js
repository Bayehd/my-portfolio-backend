const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const { requireAuth } = require('../middleware/auth'); 

// get all projects
router.get('/',requireAuth,  projectsController.getAll);

// get projects by id
router.get('/:id', equireAuth,  projectsController.getById);

// add new project
router.post('/', requireAuth, projectsController.add);

// update project by id
router.put('/:id', requireAuth,  projectsController.update);

// remove project by id
router.delete('/:id',requireAuth,  projectsController.delete);

module.exports = router;