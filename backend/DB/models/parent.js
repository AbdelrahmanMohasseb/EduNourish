const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB"); 
const Student=require('./student');
const bcrypt = require ("bcrypt")

const Parent = sequelize.define("Parent", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  
   username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo: {
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
    type: DataTypes.STRING,  // Use STRING instead of ENUM
    allowNull: false,
    validate: {
      isIn: [['male', 'female']]  // Ensures only these values are accepted in Sequelize
    }
  } ,
  
});



module.exports = Parent;