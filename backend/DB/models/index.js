const sequelize = require('../config/connectDB');
const Advisor = require('./advisor');
const Organizer = require('./organizer');
const Student=require('./student');
const Bus=require('./bus');
const Parent=require('./parent');
const Teacher=require('./Teacher');
const Signup=require("./studentsignup")
const Signin=require("./studentsignin");
const Subject = require("./subject");
const Exam = require("./Exam");
const Quiz = require('./Quiz');
const Grade = require('./grade');




// Optional: Sync database (only in development)
sequelize.sync({ alter: false })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database synchronization error:", err));

module.exports = {
   Bus,
  Teacher,
  Parent,
  Advisor,
  Organizer,
  Student,
  Subject,
  Exam,
  Quiz,
  Grade,
  Signup,
  Signin
};