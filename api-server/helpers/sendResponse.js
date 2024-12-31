import { httpStatusCodes } from "../constants/constants.js"

const sendResponse = (res, statuscode, status, operation, data) => {
    return res.status(statuscode).json({ status, operation, data: data });
}

export const errRes = (err, req, res, next) => {   // for error middleware you must have to enter params (err,req,res,next)
    // console.log("=======", err.stackTrace)
    return res.status(err.status || httpStatusCodes["Internal Server Error"]).json({ status: 'error', message: err.message || "Server Error" })
}

export default sendResponse