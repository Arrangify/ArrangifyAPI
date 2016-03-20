'use strict';

var _ = require('lodash');
var dateFormat = require('dateformat');
var Event = require('./event.model');
var esendex = require('../../config/esendex');
var pusher = require('../../config/pusher');

// Creates a new event in the DB.
exports.create = function(req, res) {
  //console.log(auth);
  var response = req.body;

  var messages = {
      accountreference: esendex.accountReference,
      message: []
  };

  var event = Event.findOne({invitees:[{phone:response.From}]});

  var invitee = _.find(event.invitees,function(inv){
      return inv.phone == response.From;
  });

  var cleanResponse = response.MessageText.replace(/[^1-9]+/g, '');
  var availableDates = [];
  cleanResponse.forEach(function(char){
      var idx = parseInt(char) - 1;
      availableDates.push(event.dates[idx]);
  })

  var dateStr =
  var messageBody = invitee.name + " has said they can make it to "+ event.name +"\r\n";

  messages.message.push({
    to: '',
    body: messageBody
  });

  message.push()
  esendex.messages.send([], function (err, response) {
    if (err) return console.log('error: ', err);
    console.dir(response);
  });

};

function handleError(res, err) {
  return res.status(500).send(err);
}
