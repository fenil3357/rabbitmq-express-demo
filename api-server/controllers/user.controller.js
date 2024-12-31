import { CustomError, httpStatusCodes } from "../constants/constants.js";
import createUser from "../db/database_functions/user/createUser.js";
import sendResponse from "../helpers/sendResponse.js";
import { addAmount } from "../db/database_functions/user/addAmount.js";

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return sendResponse(res, httpStatusCodes['Created'], 'success', 'Create a user', user);
  } catch (error) {
    next(error);
  }
}

export const addAmountController = async (req, res, next) => {
  try {
    if(!req.body.amount || req.body.amount <= 0) throw new CustomError(httpStatusCodes['Bad Request'], 'Please provide a valid amount');

    const updatedUser = await addAmount(req.body);
    return sendResponse(res, httpStatusCodes['OK'], 'success', 'Add amount to balance', updatedUser);
  } catch (error) {
    next(error);
  }
}

