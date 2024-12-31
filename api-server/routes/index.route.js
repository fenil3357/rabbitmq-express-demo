import express from 'express';
import { userRouter } from './user.route.js';
import { transactionRouter } from './transaction.route.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/transactions', transactionRouter);

export { router };
