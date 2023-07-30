const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const config = require('./server/config');
const apiRoutes = require('./server/routes');
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false,
  poolSize: 100,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.connect(config.database, options);
mongoose.set('useFindAndModify', false);
app.set('superSecret', config.serverSecret);

app.use('/api', apiRoutes);

app.use('/*', function (req, res) {
  fs.readFile(__dirname + '/client/dist/index.html', 'utf8', (err, text) => {
    res.send(text);
  });
});

app.listen(port);
console.log(`Wallet is running on http://localhost:${port}`);