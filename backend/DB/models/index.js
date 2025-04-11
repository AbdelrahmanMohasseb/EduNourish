const sequelize = require('../config/connectDB');

const Advisor = require('./advisor');
const Organizer = require('./organizer');
const Student=require('./student');
const Bus=require('./bus');
const Parent=require('./parent');
const Teacher=require('./Teacher');
const Signup=require("./studentsignup")
const TimeTable=require("./timeTable")
const Menu=require("./Menu")
const Excuse=require("./Excuse.js")
const Payment=require("./payment.js")
// Optional: Sync database (only in development)
sequelize.sync({ alter: true })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database synchronization error:", err));



  Parent.hasMany(Student, { foreignKey: 'parentId' });
  Student.belongsTo(Parent, { foreignKey: 'parentId' })

  
module.exports = {
  Payment,
  Bus,
  Teacher,
  Parent,
  Advisor,
  Organizer,
  Student,
  Signup,
  TimeTable,
  Menu,
  Excuse,
  sequelize,

};