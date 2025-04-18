const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Attendance = sequelize.define("Attendance", {
  id: {
        type: DataTypes.STRING,
        primaryKey: true,
        // autoIncrement: true
        allowNull:true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("present", "absent", "late", "excused"),
    allowNull: false
  },
  remarks: {
    type: DataTypes.STRING,
    allowNull: true
  },

  studentId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: "Students", // تأكد إن اسم الجدول فعليًا "Students"
      key: "id"
    },

    teacherID: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "Teachers",
          key: "teacherID"
        }
      }

  }
}, {
  timestamps: true
});

module.exports = Attendance;