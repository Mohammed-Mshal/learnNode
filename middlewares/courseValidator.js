import { body } from "express-validator";
const courseValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Course Name Required")
      .isLength({ min: 3, max: 20 }),
    body("price")
      .notEmpty()
      .withMessage("Course Price Required")
      .isNumeric()
      .withMessage("Price Should Be Number"),
  ];
};

export default courseValidator;
