import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import { ERROR, SUCCESS } from "../utils/httpStatusText.js";
import User from "../models/userMode.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// Register
const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const profileImage = req.file.filename;
  console.log(profileImage);
  
  if (!firstName) {
    const error = appError.create("First Name Required", 401, ERROR);
    return next(error);
  }
  if (!lastName) {
    const error = appError.create("Last Name Required", 401, ERROR);
    return next(error);
  }
  if (!email) {
    const error = appError.create("Email Required", 401, ERROR);
    return next(error);
  }
  const isUserExist = (await User.findOne({ email })) ? true : false;
  if (isUserExist) {
    const error = appError.create("Email Already Exist", 400, ERROR);
    return next(error);
  }
  if (!password) {
    const error = appError.create("Password Required", 401, ERROR);
    return next(error);
  }
  const salt = await bcrypt.genSalt(10);
  const hashingPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashingPassword,
    role,
    profileImage,
  });
  //   Generate Token
  const token = await generateToken({
    email: user.email,
    id: user._id,
    role: user.role,
  });
  user.token = token;
  await user.save();
  return res.status(201).json({ status: SUCCESS, data: { user } });
});

// Login
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    const error = appError.create("Email Required", 401, ERROR);
    return next(error);
  }
  const user = await User.findOne({ email }, { __v: false });
  if (!user) {
    const error = appError.create("Email Not Exist", 400, ERROR);
    return next(error);
  }
  if (!password) {
    const error = appError.create("Password Required", 401, ERROR);
    return next(error);
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    const error = appError.create("Password Is Not Valid", 401, ERROR);
    return next(error);
  }
  //   Generate Token
  const token = await generateToken({
    email: user.email,
    id: user._id,
    role: user.role,
  });
  user.token = token;
  await user.save();
  return res.status(201).json({ status: SUCCESS, data: { token } });
});

export { register, login };
