const express = require('express');
const router = express.Router();
const referencesController = require('../controllers/references');
const { requireAuth } = require('../middleware/auth'); 


// get all references
router.get('/', requireAuth, referencesController.getAll);

// get reference by ID
router.get('/:id', requireAuth, referencesController.getById);

// add new contact
router.post('/', requireAuth, referencesController.add);

// update contact by id
router.put('/:id',  requireAuth,referencesController.update);

// remove contact by id
router.delete('/:id', requireAuth, referencesController.delete);

module.exports = router;