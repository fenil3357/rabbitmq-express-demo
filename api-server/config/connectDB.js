import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => new Promise(async (resolve, reject) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database successfully!')
    resolve();
  } catch (error) {
    reject(error);
  }
});
