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
const Excuse=require("./excuse.js")
const Class=require("./class.js")
const Payment=require("./payment.js")
const ClassTeacher=require("./classteacher.js")

Parent.hasMany(Student, { foreignKey: 'parentId' });
Student.belongsTo(Parent, { foreignKey: 'parentId' })

Class.hasMany(TimeTable, { foreignKey: "classId" });
TimeTable.belongsTo(Class, { foreignKey: "classId" });

Excuse.belongsTo(Student, { foreignKey: 'studentId' });
Excuse.belongsTo(Parent, { foreignKey: 'parentId' });

Class.hasMany(Student, { foreignKey: 'classId' });
Student.belongsTo(Class, { foreignKey: 'classId' });

Teacher.belongsToMany(Class, { through: ClassTeacher, foreignKey: "teacherId" });
Class.belongsToMany(Teacher, { through: ClassTeacher, foreignKey: "classId" });

ClassTeacher.belongsTo(Teacher, { foreignKey: "teacherId" });
ClassTeacher.belongsTo(Class, { foreignKey: "classId" });


Student.hasMany(require('./payment.js'), { foreignKey: 'studentId' });
Payment.belongsTo(Student, { foreignKey: "studentId" });

// Optional: Sync database (only in development)
sequelize.sync({ alter: false })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database synchronization error:", err));
 


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
  Class,
  Excuse,
  ClassTeacher,
  sequelize,

};