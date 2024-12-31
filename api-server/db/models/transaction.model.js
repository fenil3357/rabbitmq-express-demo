import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: [true, 'must proide a sender'],
    maxlength: [50, 'sender cannot be more than 50 characters'],
  },
  receiver: {
    type: String,
    required: [true, 'must proide a receiver'],
    maxlength: [50, 'receiver cannot be more than 50 characters'],
  },
  amount: {
    type: Number,
    required: [true, 'must provide an amount'],
    min: 0
  }
}, { timestamps: true });

export const transactionModel = mongoose.model('Transaction', transactionSchema);
