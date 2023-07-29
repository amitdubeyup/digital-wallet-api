const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  }, {
    timestamps: true,
    collection: 'User',
  })
);