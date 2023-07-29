const Express = require('express');
const Router = Express.Router();
const Middleware = require('../middleware/auth');
const Controller = require('../controllers/user');

Router.post('/login', Controller.loginUser);
Router.post('/register', Controller.registerUser);
Router.post('/fetch', Middleware, Controller.fetchUser);
Router.post('/update', Middleware, Controller.updateUser);
Router.post('/remove', Middleware, Controller.removeUser);

Router.get('/', function (req, res) {
  return res.send({
    success: true,
    message: 'Welcome to the coolest API on the earth!',
  });
});


module.exports = Router;