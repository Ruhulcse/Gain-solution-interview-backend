const express = require("express");
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteStudent,
} = require("../controller/studentController");

router.route("/").post(createStudent).get(getAllStudents);
router
  .route("/:studentId")
  .get(getSingleStudent)
  .put(updateSingleStudent)
  .delete(deleteStudent);
module.exports = router;
