import { CustomError, httpStatusCodes } from "../constants/constants.js";
import { processTransaction } from "../db/database_functions/transaction/processTrasactions.js";
import sendResponse from "../helpers/sendResponse.js";

export const processTransactionController = async (req, res, next) => {
  try {
    if (!req.body.sender || !req.body.receiver || !req.body.amount) throw new CustomError(httpStatusCodes['Bad Request'], 'Provide all fields(sender, receiver, amount)')

    if (req.body.sender === req.body.receiver) throw new CustomError(httpStatusCodes['Conflict'], 'Can not make transaction to same account')

    const transaction = await processTransaction(req.body);
    return sendResponse(res, httpStatusCodes['OK'], 'success', 'Process transaction', transaction);
  } catch (error) {
    next(error);
  }
}