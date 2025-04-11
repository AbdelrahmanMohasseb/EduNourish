const sequelize = require('../config/connectDB');

const Advisor = require('./advisor');
const Organizer = require('./organizer');
const Student=require('./student');
const Bus=require('./bus');
const Parent=require('./parent');
const Teacher=require('./Teacher');
const Signup=require("./studentsignup")
const Signin=require("./studentsignin")
const News=require("./news")
const Feedback=require("./feedback")
const Advice=require("./advice")
const Notification=require("./notification")
const Subject = require("./subject");


Parent.hasMany(Student, { foreignKey: 'parentId' });
Student.belongsTo(Parent, { foreignKey: 'parentId' });
Subject.hasMany(Teacher, { foreignKey: 'SubjectID' });
Teacher.belongsTo(Subject, { foreignKey: 'SubjectID' });


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
  Signup,
  Signin,
  Subject,
  News,
  Feedback,
  Advice,
  Notification,
  sequelize,

};