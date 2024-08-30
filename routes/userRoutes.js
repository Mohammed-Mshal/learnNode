import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.route("/").get(verifyToken, getAllUsers);

export default router;
