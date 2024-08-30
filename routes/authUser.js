import express from "express";
import { login, register } from "../controllers/authUser.js";
import multer from "multer";
import path, { dirname } from "path";
import appError from "../utils/appError.js";
import { FAIL } from "../utils/httpStatusText.js";
import { fileURLToPath } from "url";
const router = express.Router();
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileName = path.join(
      `${file.filename}.${file.mimetype.split("/")[1]}`
    );
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  }
  return cb(appError.create("File Type Is Not Supported", 400, FAIL), false);
};
const upload = multer({
  storage: diskStorage,
  fileFilter,
  limits:{
    fileSize:1024*1024*3
  }
});
router.route("/login").post(login);
router.route("/register").post(upload.single("profileImage"),register);

export default router;
