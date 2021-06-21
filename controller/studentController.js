const asyncHandler = require("express-async-handler");
const Student = require("../models/Student");

//@desc    Create Student
//@route   POST /api/v1/student
//@access  Public
const createStudent = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, dateofbirth } = req.body;
  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    res.status(409).json({ message: "student already exists" });
  } else {
    const student = new Student({
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
      dateOfBirth: dateofbirth,
    });
    try {
      const result = await student.save();
      res.json(result);
    } catch (error) {
      res.json({ message: error });
    }
  }
});

//@desc    get all Student
//@route   GET /api/v1/student
//@access  Public
const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.json({ message: error });
  }
});

//@desc    get a single Student
//@route   GET /api/v1/student/:studentId:
//@access  Public
const getSingleStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    student ? res.json(student) : res.json({ message: "student not found" });
  } catch (error) {
    res.json({ message: error });
  }
});

//@desc    update a single Student's information
//@route   PUT /api/v1/student/:studentID:
//@access  Public
const updateSingleStudent = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, dateofbirth } = req.body;
  try {
    const student = await Student.findById(req.params.studentId);
    if (student) {
      student.firstName = firstname || student.firstName;
      student.lastName = lastname || student.lastName;
      student.email = email || student.email;
      student.phone = phone || student.phone;
      student.dateOfBirth = dateofbirth || student.dateOfBirth;

      const updateStudent = await student.save();
      res.json({
        _id: updateStudent._id,
        message: "student updated",
      });
    } else {
      res.status(404);
      throw new Error("student not found");
    }
  } catch (error) {
    res.json({ message: error });
  }
});

//@desc    delete a single Student's information
//@route   DEL /api/v1/student/:studentID:
//@access  Public
const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (student) {
      await Student.deleteOne({ _id: student._id });
      res.json({ message: "student deleted successfully" });
    } else {
      res.status(404);
      throw new Error("student not found");
    }
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteStudent,
};
