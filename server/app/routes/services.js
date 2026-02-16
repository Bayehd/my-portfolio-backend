const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services');

// get all services
router.get('/', servicesController.getAll);

// get service by ID
router.get('/:id', servicesController.getById);

// add new service
router.post('/', servicesController.add);

// update service by ID
router.put('/:id', servicesController.update);

// remove service by ID
router.delete('/:id', servicesController.delete);

module.exports = router;