import express from 'express';
import { addAmountController, createUserController } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/', createUserController);
userRouter.post('/add-money', addAmountController)

export { userRouter };
