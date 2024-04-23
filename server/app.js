const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const mongoose = require("mongoose");
const userControllers = require('./controllers/user');
const studentControllers = require('./controllers/student');
const { addStudent, getAllStudents } = require('./controllers/student');
const {createEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee} = require('./controllers/employee');

const cors = require('cors');


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/AdminPortal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.post("/signup", userControllers.signup)
app.post("/signin", userControllers.signin)
app.post("/send-otp", userControllers.sendotp)
app.post("/submit-otp", userControllers.submitotp)
app.post("/api/students", addStudent);
app.get("/api/students", getAllStudents);
app.use('/api/employees', createEmployee);
app.use('/api/employees', getAllEmployees);
app.use('/api/employees', getEmployeeById);
app.use('/api/employees', updateEmployee);
app.use('/api/employee',deleteEmployee)

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
