import { startSession } from "mongoose";
import { CustomError, httpStatusCodes } from "../../../constants/constants.js";
import { userModel } from "../../models/user.model.js";
import { transactionModel } from "../../models/transaction.model.js";

export const processTransaction = async (data) => {
  let session;
  try {
    session = await startSession()
    session.startTransaction();

    const senderUserName = data.sender;
    const receiverUserName = data.receiver;
    const amount = data.amount;

    const sender = await userModel.findOneAndUpdate({
      username: senderUserName,
    }, {
      $inc: {
        balance: -amount
      }
    }, {
      session
    })

    if (!sender) {
      throw new CustomError(httpStatusCodes['Conflict'], 'sender does not exists');
    }

    const receiver = await userModel.findOneAndUpdate({
      username: receiverUserName
    }, {
      $inc: {
        balance: amount
      }
    }, {
      session
    })

    if (!receiver) {
      throw new CustomError(httpStatusCodes['Conflict'], 'receiver does not exists');
    }

    const transactionData = {
      "sender": sender.toJSON().username,
      "receiver": receiver.toJSON().username,
      "amount": amount
    }

    // const transaction = await transactionModel.create(transactionData, { session }) 

    const transaction = new transactionModel(transactionData);
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return transaction;
  } catch (error) {
    if (session) {
      await session.abortTransaction(); // Rollback the transaction if an error occurred
      session.endSession(); // End the session
    }
    throw new CustomError(error.status, error.message);
  }
}