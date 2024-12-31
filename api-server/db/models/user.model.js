import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must proide a username'],
    maxlength: [50, 'username cannot be more than 50 characters'],
    unique: [true, 'username already in use'],
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });

// to ensure that while updating the amount in transaction, balance does not become negative
userSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  const amount = update.$inc?.balance;

  if (amount !== undefined && amount < 0) {
    const { username } = this._conditions;
    const user = await this.model.findOne({ username });
    if (user.balance + amount < 0) {
      throw new Error('Not enough balance to make this transaction');
    }
  }

  next();
});

export const userModel = mongoose.model('User', userSchema);
