import { CustomError, httpStatusCodes } from "../../../constants/constants.js"
import { userModel } from "../../models/user.model.js"

const createUser = async (data) => {
    try {
        const new_user = await userModel.create(data);
        if (!new_user) {
            throw new CustomError(httpStatusCodes["Bad Request"], "Invalid Data")
        }
        return new_user.toJSON()
    }
    catch (err) {
        throw new CustomError(httpStatusCodes['Bad Request'], err.message)
    }
}

export default createUser