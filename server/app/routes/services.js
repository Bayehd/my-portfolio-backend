const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services');
const { requireAuth } = require('../middleware/auth');

// Public routes
router.get('/', servicesController.getAll);
router.get('/:id', servicesController.getById);

// Protected routes
router.post('/', requireAuth, servicesController.add);
router.put('/:id', requireAuth, servicesController.update);
router.delete('/:id', requireAuth, servicesController.delete);

module.exports = router;