/**
 * Main application routes
 */

'use strict';

var path = require('path');
var express = require('express');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/events', require('./api/event'));
console.log(__dirname+'/public');
  app.use('/login',express.static(__dirname+'/public/login.html'));


};
