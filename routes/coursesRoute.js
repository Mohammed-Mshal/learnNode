import express from "express";
import courseValidator from "../middlewares/courseValidator.js";
import { getAllCourses,getCourse, addCourse,updateCourse } from "../controllers/courseController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { userRoles } from "../utils/userRoles.js";
import allowedTo from "../middlewares/allowedTo.js";
const router = express.Router();

router.route("/").get(getAllCourses).post(courseValidator(),verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),addCourse);
router.route("/:idCourse").get(getCourse).put(updateCourse);

export default router;
