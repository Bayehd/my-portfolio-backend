const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');
const { requireAuth } = require('../middleware/auth');

// Public routes
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.add);  // Signup doesn't need auth

// Protected routes (only update and delete need auth)
router.put('/:id', requireAuth, usersController.update);
router.delete('/:id', requireAuth, usersController.delete);

module.exports = router;