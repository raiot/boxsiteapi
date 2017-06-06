module.exports = function(app) {
  var Users = require('../controllers/UserController');

  app.route('/login')
    .post(Users.login);

  app.route('/sign-in')
  .post(Users.create);

  app.route('/logout')
  .get(Users.logout);


  app.route('/users/manage/:userId')
    .put(Users.update)
    .delete(Users.delete);
};
