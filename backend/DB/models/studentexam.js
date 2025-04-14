const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB'); // تأكد من مسار قاعدة البيانات
const Student = require('../models/student');
const Exam = require('../models/Exam');

const StudentExam = sequelize.define("StudentExam", {
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Student, // استخدم الموديل مباشرة بدلاً من الاسم النصي
      key: 'id'
    }
  },
  examId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Exam,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  tableName: 'StudentExams' // تأكد إن اسم الجدول متسق ومحدد
});

module.exports = StudentExam;

