import mongoose, { Schema } from "mongoose";
import validator from "validator";
import { userRoles } from "../utils/userRoles.js";
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Failed must be a valid Email Address"],
  },
  password: {
    type: String,
    required: true,
    validate: [
      validator.isStrongPassword,
      "Password Should Be Contains Character and Number And special Character",
    ],
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANAGER],
    default: userRoles.USER,
    required: true,
  },
  profileImage:{
    type:String,
    default:"/uploads/defaultAvatar.jpg"
  }
});

const modelUser = mongoose.models.user || mongoose.model("User", userSchema);
export default modelUser;
