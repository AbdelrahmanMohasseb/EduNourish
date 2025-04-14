
const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Grade = sequelize.define("Grade", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,  
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,  
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: true,  
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: true,  
  },
  obtainedMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,  
  },
  grade: {
    type: DataTypes.ENUM("A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"),
    allowNull: false,  
  },
}, {
  timestamps: true,  
});

module.exports = Grade ;  