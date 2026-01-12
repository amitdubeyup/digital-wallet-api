require('dotenv').config();

module.exports = {
  database: process.env.DATABASE,
  server_secret: process.env.SERVER_SECRET,
  token_expirey: process.env.TOKEN_EXPIREY,
};

