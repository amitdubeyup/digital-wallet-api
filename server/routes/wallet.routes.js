const Express = require('express');
const Router = Express.Router();
const Middleware = require('../middleware/auth');
const Controller = require('../controllers/wallet');

Router.get('/balance/:user_id', Middleware, Controller.walletBalance);
Router.get('/transaction/:_id', Middleware, Controller.fetchTransaction);
Router.get('/transactions/:user_id', Middleware, Controller.fetchTransactions);
Router.post('/transaction/:user_id', Middleware, Controller.createTransaction);

Router.get('/', function (req, res) {
    return res.send({
        success: true,
        message: 'Welcome to the coolest API on the earth!',
    });
});


module.exports = Router;