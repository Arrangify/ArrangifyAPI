'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var esendex = require('../../config/esendex');
var pusher = require('../../config/pusher');
var auth = require('../../config/auth0');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(events);
  });
};

// Get a single event
exports.show = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    return res.json(event);
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
  //console.log(auth);
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }

    var messages = {
        accountreference: esendex.accountReference,
        message: []
    };

    for (var i = 0; i < req.body.invitees.length; i++) {
        messages.message.push({
          to: '447863961817',
          body: 'We are totally winning.'
      });
    }

    esendex.messages.send(messages, function (err, response) {
      if (err) return console.log('error: ', err);
      console.dir(response);
    });

    return res.status(201).json(event);
  });
};

// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    var updated = _.merge(event, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.status(404).send('Not Found'); }
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
