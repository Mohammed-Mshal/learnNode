import jwt from "jsonwebtoken";
import { ERROR } from "../utils/httpStatusText.js";
import appError from "../utils/appError.js";
const verifyToken = (req, res, next) => {
  const token =
    req.headers?.Authorization?.split(" ")[1] ||
    req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: ERROR, message: "Token Is Required" });
  }
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.infoUser=currentUser
    next();
  } catch (error) {
    const errorCreated = appError.create(error.message, 401, ERROR);
    return next(errorCreated);
  }
};

export default verifyToken;
