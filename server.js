var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  NewsItems = require('./api/models/NewsItemModel'),
  Users = require('./api/models/UserModel'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  session = require('express-session'),
  config = require('./config.js');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/boxsitedb'); 

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: config.getSecret(), saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());


const newsRoutes = require('./api/routes/NewsItemRoutes');
const userRoutes = require('./api/routes/UserRoutes');
newsRoutes(app);
userRoutes(app);


app.listen(port);

console.log('boxsiteapi RESTful API server started on: ' + port);