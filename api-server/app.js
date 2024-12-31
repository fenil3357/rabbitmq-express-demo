import express from 'express'
import { connectDB } from './config/connectDB.js';
import { router } from './routes/index.route.js';
import { errRes } from './helpers/sendResponse.js';
import { CustomError, httpStatusCodes } from './constants/constants.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', router);

app.use("*", (req, res, next) => {
  next(new CustomError(httpStatusCodes['Not Found'], 'Not found'))
})

app.use(errRes)

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server running on http://localhost:${PORT}`);
})