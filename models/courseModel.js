import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const modelCourse =
  mongoose.models.course || mongoose.model("Course", courseSchema);
export default modelCourse;
