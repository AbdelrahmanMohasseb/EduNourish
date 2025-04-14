const sequelize = require('../config/connectDB');
const Advisor = require('./advisor');
const Organizer = require('./organizer');
const Student=require('./student');
const Bus=require('./bus');
const Parent=require('./parent');
const Teacher=require('./Teacher');
const Signup=require("./studentsignup");
const Signin=require("./studentsignin");
const Subject = require("./subject");
const Exam = require("./Exam");
const Quiz = require('./Quiz');
const Grade = require('./grade');
const Attendance=require("./attendance");
const Alarm=require("./Alarm");
const StudentExam = require('./studentexam');


Subject.hasMany(Teacher, { foreignKey: 'SubjectID' });
Teacher.belongsTo(Subject, { foreignKey: 'SubjectID' });

Parent.hasMany(Student, { foreignKey: 'parentId' });
Student.belongsTo(Parent, { foreignKey: 'parentId' });


Student.belongsToMany(Exam, { through: StudentExam, foreignKey: 'studentId' });
Exam.belongsToMany(Student, { through: StudentExam, foreignKey: 'examId' });

Teacher.hasMany(Exam, { foreignKey: 'teacherID' });
Exam.belongsTo(Teacher, { foreignKey: 'teacherID' });


Student.hasMany(Attendance, { foreignKey: 'studentId' });
Attendance.belongsTo(Student, { foreignKey: 'studentId' });

Student.hasMany(Subject, { foreignKey: "studentId" });
Subject.belongsTo(Student, { foreignKey: "studentId" });


Teacher.hasMany(Attendance, { foreignKey: "teacherID" });
Attendance.belongsTo(Teacher, { foreignKey: "teacherID" });



// Optional: Sync database (only in development)
sequelize.sync({ alter: false })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database synchronization error:", err));


module.exports = {
  Bus,
  Teacher,
  Parent,
  Student,
  Organizer,
  Subject,
  Exam,
  Quiz,
  Grade,
  Attendance,
  Alarm,
  Advisor,
  Signup,
  Signin,
  StudentExam
};
