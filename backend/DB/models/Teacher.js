const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Teacher = sequelize.define("Teacher", {
  teacherID: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
    allowNull: true,
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  
});

module.exports = Teacher;