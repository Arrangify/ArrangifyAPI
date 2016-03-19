/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Event = require('../api/event/event.model');


// Insert seed data below
var eventSeed = require('../api/event/event.seed.json');

// Insert seed inserts below
Event.find({}).remove(function() {
	Event.create(eventSeed);
});
