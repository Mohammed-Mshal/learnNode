import Course from "../models/courseModel.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import { ERROR } from "../utils/httpStatusText.js";

const getAllCourses = asyncWrapper(async (req, res) => {
  const limit = req.query.limit || 3;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  return res.status(200).json({
    status: "SUCCESS",
    data: { courses },
  });
});
const updateCourse = asyncWrapper(async (req, res) => {
  const { idCourse } = req.params;
  if (!idCourse) {
    return res.status(400).json({ message: "Id Course Is Required" });
  }
  const { name, price } = req.body;
  const newCourse = await Course.updateOne(
    { _id: idCourse },
    {
      $set: {
        name,
        price,
      },
    }
  );
  return res.status(200).json(newCourse);
});
const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(
      errors.array(),
      400,
    );
    return next(error);
  }
  const { name, price } = req.body;
  const newCourse = await Course.create({
    name,
    price,
  });
  return res.status(200).json(newCourse);
});
const getCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;
    if (!idCourse) {
      return res.status(400).json({ message: "Id Course Is Required" });
    }
    const course = await Course.findOne({ _id: idCourse });
    if (!course) {
      return res.status(400).json({ message: "Course Is Not Found" });
    }

    return res.status(200).json({
      status: "SUCCESS",
      data: { course },
    });
  } catch (error) {
    return res.status(200).json(error.message);
  }
};
export { getAllCourses, addCourse, getCourse, updateCourse };
