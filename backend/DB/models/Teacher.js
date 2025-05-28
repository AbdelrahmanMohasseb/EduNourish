const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Teacher = sequelize.define("Teacher", {
  teacherID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
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
   photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,  // Use STRING instead of ENUM
    allowNull: false,
    validate: {
      isIn: [['male', 'female']]  // Ensures only these values are accepted in Sequelize
    }
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  SubjectID: {
    type: DataTypes.STRING,
    references: {
      model: 'Subjects',
      key: 'SubjectID',
      },
    }
  
});

module.exports = Teacher;