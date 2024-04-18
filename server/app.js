const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const mongoose = require("mongoose");
const userControllers = require('./controllers/user');
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

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
