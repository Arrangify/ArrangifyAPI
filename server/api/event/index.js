'use strict';

var express = require('express');
var controller = require('./event.controller');
var auth = require('../../config/auth0');
var router = express.Router();
var app = express();

router.get('/', controller.index);
router.get('/:id', controller.show);
//app.use('/', );
router.post('/',auth, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
