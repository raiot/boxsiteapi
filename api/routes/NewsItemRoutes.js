module.exports = function(app) {
  var NewsItems = require('../controllers/NewsItemController');

  app.route('/news')
    .get(NewsItems.list_all)
    .post(NewsItems.create);


  app.route('/news/item/:newsItemId')
    .get(NewsItems.read)
    .put(NewsItems.update)
    .delete(NewsItems.delete);
};
