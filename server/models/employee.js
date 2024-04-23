const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    occupation: String,
    salary: Number,
    age: Number
  });
  const Employee = mongoose.model('Employee', employeeSchema);

  module.exports = Employee;
