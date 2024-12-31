import { CustomError, httpStatusCodes } from "../../../constants/constants.js"
import { userModel } from "../../models/user.model.js"


export const addAmount = async (data) => {
  try {
    const user = await userModel.findOneAndUpdate({
      username: data.username,
    }, {
      $inc: {
        balance: data.amount
      }
    })

    if (!user) throw new CustomError(httpStatusCodes['Conflict'], 'User does not exsits');

    return user;
  } catch (error) {
    throw new CustomError(httpStatusCodes['Bad Request'], error.message);
  }
}