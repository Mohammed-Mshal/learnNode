import asyncWrapper from "../middlewares/asyncWrapper.js";
import User from "../models/userMode.js";
import { SUCCESS } from "../utils/httpStatusText.js";
// Get All Users
const getAllUsers = asyncWrapper(async (req, res, next) => {
    const query = req.query;

  const page = query.page;
  const limit = query.limit;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  return res.status(200).json({
    status: SUCCESS,
    data: {
      users,
    },
  });
});

export { getAllUsers };
