
const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Grade = sequelize.define("Grad", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,  
  },
 
  examId: {
    type: DataTypes.STRING,
    allowNull: true,  
  },

  obtainedMarks: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  grade: {
    type: DataTypes.ENUM("A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"),
    allowNull: false,  
  },


StudentIDg: {
  type: DataTypes.STRING,
  references: {
      model: 'Students',
      key: 'id',
  },
  allowNull: false
}

}, {
  timestamps: true,  
});

module.exports = Grade ;  