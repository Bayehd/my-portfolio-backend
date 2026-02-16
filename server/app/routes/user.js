const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// get all users
router.get('/', usersController.getAll);

// get user by ID
router.get('/:id', usersController.getById);

// add new user
router.post('/', usersController.add);

// update user by ID
router.put('/:id', usersController.update);

// remove user by ID
router.delete('/:id', usersController.delete);

module.exports = router;