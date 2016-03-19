/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var jwt = require('express-jwt');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);

var jwtCheck = jwt({
  secret: new Buffer('f4AGFyYmmTJdzDMg4b4P6bwWYgacKvXI-5pbToxH0o_aSTI2qtEJ3Gx7ky1W6Qq4', 'base64'),
  audience: 'aTXYBsgnA1yrAUygOY138OilcGObKtCV'
});

app.use('/api/users', jwtCheck);

require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
