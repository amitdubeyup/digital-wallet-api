const jwt = require('jsonwebtoken');
const config = require('../config');

const authGuard = (req, res, next) => {
    const token = req.body['token'] || req.query['token'] || req.headers['token'];
    if (token) {
        jwt.verify(token, config.server_secret, function (error, decoded) {
            if (error) {
                if (error.message === 'jwt expired') {
                    return res.send({
                        success: false,
                        message: 'Session expired!',
                    });
                } else {
                    return res.send({
                        success: false,
                        message: 'Authentication failed!',
                    });
                }
            } else {
                req['token'] = decoded.data;
                next();
            }
        });
    } else {
        return res.send({
            success: false,
            message: 'Unauthorized access!',
        });
    }
}

module.exports = authGuard;