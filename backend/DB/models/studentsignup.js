const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const StudentSignup = sequelize.define("StudentSignup", {
  
    
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
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
    classNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true // لتتبع وقت الإنشاء والتحديث
});



module.exports = StudentSignup;
