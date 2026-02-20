var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

router.get('/', indexController.hello);

module.exports = router;