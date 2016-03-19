/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/events', require('./api/event'));
  app.use('/api/things', require('./api/thing'));
  

};
