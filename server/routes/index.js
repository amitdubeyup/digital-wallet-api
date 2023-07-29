const Express = require('express');
const Router = Express.Router();

const UserRoutes = require('./user.routes');
const WalletRoutes = require('./wallet.routes');

Router.use('/user', UserRoutes);
Router.use('/wallet', WalletRoutes);

Router.get('/', function (req, res) {
  return res.send({
    success: true,
    message: 'Welcome to the coolest API on the earth!',
  });
});

module.exports = Router;