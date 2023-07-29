const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Wallet',
  new Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: null,
    },
    created_at: {
      type: Date,
      default: function () {
        return Date.now();
      }
    },
    updated_at: {
      type: Date,
      default: function () {
        return Date.now();
      }
    }
  }, {
    timestamps: false,
    collection: 'Wallet',
  })
);