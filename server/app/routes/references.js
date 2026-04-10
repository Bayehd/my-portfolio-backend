const express = require('express');
const router = express.Router();
const referencesController = require('../controllers/references');
const { requireAuth } = require('../middleware/auth'); 

// Public routes (anyone can view)
router.get('/', referencesController.getAll);
router.get('/:id', referencesController.getById);

// Protected routes (require authentication)
router.post('/', requireAuth, referencesController.add);
router.put('/:id', requireAuth, referencesController.update);
router.delete('/:id', requireAuth, referencesController.delete);

module.exports = router;