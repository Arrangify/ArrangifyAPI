'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  sub: String,
  name: String,
  info: String,
  createdOn: Date,
  url: String,
  invitees:[
    {
      name: String,
      email: String,
      phone: Number,
      dates:{type:Array, "default":[]}
    }
  ],
  dates:{type:Array, "default":[]},
  active: Boolean
});

module.exports = mongoose.model('Event', EventSchema);
