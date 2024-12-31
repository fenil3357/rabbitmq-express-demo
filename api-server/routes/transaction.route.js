import express from 'express';
import { processTransactionController } from '../controllers/transaction.controller.js';

const transactionRouter = express.Router();

transactionRouter.get('/', (req, res) => {
  res.end('Transactions')
})
transactionRouter.post('/', processTransactionController);

export { transactionRouter };
