'use strict';


var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    passport = require('passport'),
    Users = mongoose.model('User');


Users.schema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

Users.schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return next(err);

        cb(null, isMatch);
    });
};



exports.create = function(req, res) {
  var user = new Users(req.body);
  user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.login = function(req, res) {
    passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.update = function(req, res) {
  Users.findOneAndUpdate(req.params.userId, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete = function(req, res) {
  Users.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};
