'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the user name'
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastname: {
    type: String,
    Required: 'Please enter the last name'
  },
  userName: {
    type: String,
    Required: 'Please enter your username',
    unique: true
  },
  email: {
    type: String,
    Required: 'Please enter your email',
    unique: true
  },
  password: {
      type: String,
      required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('User', UserSchema);