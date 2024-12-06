const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  income: {
    type: Number,
    default: 0
  },
  expenses: [ {
    name: String,
    cost: Number,
    date: {
      type: Date,
      default: Date.now
    }
  } ],
  transactions: [ {
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    name: String,
    date: {
      type: Date,
      default: Date.now
    }
  } ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Finance', financeSchema);
