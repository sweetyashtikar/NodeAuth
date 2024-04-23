const Student = require('../models/student');

async function addStudent(req, res) {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getAllStudents(req, res) {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { addStudent, getAllStudents };
