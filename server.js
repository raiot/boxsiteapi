var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  NewsItems = require('./api/models/NewsItemModel'),
  bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/boxsitedb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/NewsItemRoutes');
routes(app);


app.listen(port);

console.log('boxsiteapi RESTful API server started on: ' + port);