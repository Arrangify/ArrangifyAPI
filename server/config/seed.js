/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var Event = require('../api/event/event.model');
var Thing = require('../api/thing/thing.model');


// Insert seed data below
var eventSeed = require('../api/event/event.seed.json');
var thingSeed = require('../api/thing/thing.seed.json');

// Insert seed inserts below
Event.find({}).remove(function() {
	Event.create(eventSeed);
});


Thing.find({}).remove(function() {
  Thing.create(thingSeed);
});