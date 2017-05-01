'use strict';


var mongoose = require('mongoose'),
  NewsItems = mongoose.model('NewsItem');

exports.list_all = function(req, res) {
  NewsItems.find({}, function(err, newsItem) {
    if (err)
      res.send(err);
    res.json(newsItem);
  });
};




exports.create = function(req, res) {
  var new_newsItem = new NewsItems(req.body);
  new_newsItem.save(function(err, newsItem) {
    if (err)
      res.send(err);
    res.json(newsItem);
  });
};


exports.read = function(req, res) {
  NewsItems.findById(req.params.newsItemId, function(err, newsItem) {
    if (err)
      res.send(err);
    res.json(newsItem);
  });
};


exports.update = function(req, res) {
  NewsItems.findOneAndUpdate(req.params.newsItemId, req.body, {new: true}, function(err, newsItem) {
    if (err)
      res.send(err);
    res.json(newsItem);
  });
};


exports.delete = function(req, res) {


  NewsItems.remove({
    _id: req.params.newsItemId
  }, function(err, newsItem) {
    if (err)
      res.send(err);
    res.json({ message: 'News item successfully deleted' });
  });
};
