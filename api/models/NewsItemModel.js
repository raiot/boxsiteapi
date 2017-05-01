'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NewsItemSchema = new Schema({
  title: {
    type: String,
    Required: 'Kindly enter the title of the news item'
  },
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    Required: 'Please enter the body of the news item'
  },
  contentSnipet: {
    type: String
  },
  img: {
      type: String
  },
  author: {
      type: String
  }
});

module.exports = mongoose.model('NewsItem', NewsItemSchema);