const Express = require('express');
const Router = Express.Router();

const Routes = require('./user.routes');

Router.use('/user', Routes);

Router.get('/', function (req, res) {
  return res.send({
    success: true,
    message: 'Welcome to the coolest API on the earth!',
  });
});

module.exports = Router;