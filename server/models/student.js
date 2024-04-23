const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  placementStatus: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
