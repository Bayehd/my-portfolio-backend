const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const { requireAuth } = require('../middleware/auth');

// Public routes (anyone can view)
router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getById);

// Protected routes (require authentication)
router.post('/', requireAuth, projectsController.add);
router.put('/:id', requireAuth, projectsController.update);
router.delete('/:id', requireAuth, projectsController.delete);

module.exports = router;