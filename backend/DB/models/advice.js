const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB');

const Advice = sequelize.define('Advice', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  parentAdvice: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  teacherAdvice: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Advice;
