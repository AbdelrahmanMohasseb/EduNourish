const { DataTypes } = require("sequelize");
const sequelize = require("../../DB/config/connectDB");

const Quiz = sequelize.define(
  "Quiz",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      // المدة بالدقائق
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("scheduled", "ongoing", "completed"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Quiz;
