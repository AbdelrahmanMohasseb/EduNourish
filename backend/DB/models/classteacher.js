// models/classTeacher.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");
const Teacher = require("./Teacher");
const Class = require("./class");

const ClassTeacher = sequelize.define("ClassTeacher", {
//   id: {
//     type: DataTypes.STRING,
//     primaryKey: true
//   },
  classId: {
    type: DataTypes.STRING,
    references: {
      model: "Classes",
      key: "id"
    }
  },
  teacherId: {
    type: DataTypes.STRING,
    references: {
      model: "Teachers",
      key: "id"
    }
  },
  subject: {
    type: DataTypes.STRING, 
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = ClassTeacher;
