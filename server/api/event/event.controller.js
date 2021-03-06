'use strict';

var _ = require('lodash');
var dateFormat = require('dateformat');
var Event = require('./event.model');
var esendex = require('../../config/esendex');
var pusher = require('../../config/pusher');
var auth = require('../../config/auth0');

// Get list of events
exports.index = function(req, res) {
  console.log('Get events for ',req.user.name);
  Event.find({sub:req.user.sub},function (err, events) {
    if(err) { return handleError(res, err); }

    if(events.length == 0)
    {
      Event.find({sub:req.user.sub},function (err, events) {
        if(err) { return handleError(res, err); }
        if(!events) { return res.status(404).send('Not Found'); }
        return res.json(events);
    });
  }
  else {
    return res.status(200).json(events);
  }

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
  req.body.sub = req.user.sub;
  Event.create(req.body, function(err, event) {
    if(err) { return handleError(res, err); }

    var messages = {
        accountreference: esendex.accountReference,
        message: []
    };

    for (var i = 0; i < req.body.invitees.length; i++) {
        var messageBody = 'Hi '+req.body.invitees[i].name+'.\r\n'
            + 'You have been invited to ' + req.body.name + ' by '+req.user.name+'.\r\n\r\n'
            + 'Proposed Dates:\r\n'

        req.body.dates.forEach(function(date,idx,arr){
            messageBody = messageBody + (idx+1).toString() + ") " + dateFormat(new Date(date),'dd mmm yyyy') +'\r\n'
        });

        messageBody += "\r\nPlease reply to this message with your availability:\r\n e.g 2 3"
        messages.message.push({
          to: req.body.invitees[i].phone,
          body: messageBody
      });
    }

    console.log(messages);
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
    event.active = false;
    event.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(event);});
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
