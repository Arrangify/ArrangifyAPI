'use strict';

var _ = require('lodash');
var dateFormat = require('dateformat');
var Event = require('../event/event.model');
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
  var event;
  console.log(response.inboundmessage.from[0]);
  Event.findOne({invitees:{phone:parseInt(response.inboundmessage.from[0])}},function(err,fetchedEvent){
    event = fetchedEvent;
  });
  var invitee = _.find(event.invitees,function(inv){
      return inv.phone == response.inboundmessage.from[0];
  });

  var cleanResponse = response.inboundmessage.messagetext[0].replace(/[^1-9]+/g, '').split("");
  console.log(cleanResponse);
  var availableDates = [];
  console.log(event);
  cleanResponse.forEach(function(char){
      var idx = parseInt(char) - 1;
      if(event.dates[idx])
        availableDates.push(event.dates[idx]);
  });

  var dateStr = "";
  availableDates.forEach(function(date,idx){
    if(idx>0)
    {
        dateStr += " or ";
    }

    dateStr +=  dateFormat(new Date(date),'dd mmm yyyy') ;
  })

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
