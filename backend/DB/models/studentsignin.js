
const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const StudentSignin = sequelize.define("StudentSignin", {
  
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        },
      },
      password: {
        type: DataTypes.STRING, // Store hashed password
        allowNull: false
    
    },
    
}, {
    timestamps: true 
});



module.exports = StudentSignin;
