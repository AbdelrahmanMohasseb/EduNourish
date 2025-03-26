const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Advice = sequelize.define("Advice", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER, // Automatically associated with parent
    allowNull: false,
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adviceMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING, // Automatically associated with parent’s child
    allowNull: false,
  },
}, { 
  timestamps: true,
});

module.exports = Advice;
