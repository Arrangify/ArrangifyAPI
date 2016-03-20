'use strict';

var express = require('express');
var controller = require('./event.controller');
var auth = require('../../config/auth0');
var router = express.Router();
var app = express();

router.get('/',auth, controller.index);
router.get('/:id',auth, controller.show);
router.post('/',auth, controller.create);
router.put('/:id',auth, controller.update);
router.patch('/:id',auth, controller.update);
router.delete('/:id',auth, controller.destroy);

module.exports = router;
