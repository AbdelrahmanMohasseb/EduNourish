const sequelize = require('../config/connectDB');

const Advisor = require('./advisor');
const Organizer = require('./organizer');
const Student=require('./student');
const Bus=require('./bus');
const Parent=require('./parent');
const Teacher=require('./Teacher');
const News=require("./news")
const Feedback=require("./feedback")
const Advice=require("./advice")
const Notification=require("./notification")
const Subject = require("./subject");
const TimeTable=require("./timeTable")
const Exam = require("./Exam");
const Grade = require('./grade');
const Attendance=require("./attendance");
const StudentExam = require('./studentexam');
const Menu=require("./Menu")
const Excuse=require("./Excuse.js")
const Class=require("./class.js")
const Payment=require("./payment.js")
const ClassTeacher=require("./classteacher.js")
const InstructionAI = require("./instructionAi.js");
const Material = require("./Material.js");




Parent.hasMany(Student, { foreignKey: 'parentId' });
Student.belongsTo(Parent, { foreignKey: 'parentId' });
Parent.hasMany(Menu, { foreignKey: 'parentId' });
Menu.belongsTo(Parent, { foreignKey: 'parentId' });
Subject.hasMany(Teacher, { foreignKey: 'SubjectID' });
Teacher.belongsTo(Subject, { foreignKey: 'SubjectID' });

Advice.belongsTo(Parent, { foreignKey: 'parentId' });
Parent.hasMany(Advice, { foreignKey: 'parentId' });

Advice.belongsTo(Teacher, { foreignKey: 'teacherId' });
Teacher.hasMany(Advice, { foreignKey: 'teacherId' });

Student.belongsToMany(Exam, { through: StudentExam, foreignKey: 'studentId' });
Exam.belongsToMany(Student, { through: StudentExam, foreignKey: 'examId' });


Student.hasMany(Grade, { foreignKey: 'StudentIDg' });
Grade.belongsTo(Student, { foreignKey: 'StudentIDg' });

Student.hasMany(Attendance, { foreignKey: 'studentId' });
Attendance.belongsTo(Student, { foreignKey: 'studentId' });

Student.hasMany(Subject, { foreignKey: "studentId" });
Subject.belongsTo(Student, { foreignKey: "studentId" });


Teacher.hasMany(Attendance, { foreignKey: "teacherID" });
Attendance.belongsTo(Teacher, { foreignKey: "teacherID" });


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

Payment.belongsTo(Student, { foreignKey: "studentId" });
Parent.hasMany(InstructionAI, { foreignKey: 'parentId' });  
InstructionAI.belongsTo(Parent, { foreignKey: 'parentId' });  
Student.hasMany(require('./payment.js'), { foreignKey: 'studentId' });
Subject.hasMany(Material, { foreignKey: "SubjectID" });
Material.belongsTo(Subject, { foreignKey: "SubjectID" });

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
  News,
  Feedback,
  Advice,
  Notification,
  TimeTable,
  Exam,
  Grade,
  Attendance,
  StudentExam,
  Menu,
  Class,
  Excuse,
  ClassTeacher,
  InstructionAI,
  Material,
  sequelize,

};



