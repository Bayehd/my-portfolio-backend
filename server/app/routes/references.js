const express = require('express');
const router = express.Router();
const referencesController = require('../controllers/references');

// get all references
router.get('/', referencesController.getAll);

// get reference by ID
router.get('/:id', referencesController.getById);

// add new contact
router.post('/', referencesController.add);

// update contact by id
router.put('/:id', referencesController.update);

// remove contact by id
router.delete('/:id', referencesController.delete);

module.exports = router;