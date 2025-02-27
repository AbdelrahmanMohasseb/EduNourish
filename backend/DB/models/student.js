const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Student = sequelize.define("Student", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false
      },
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
    
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photo:{
        type:DataTypes.STRING,
        allowNull:false
      },
      address:{
        type:DataTypes.STRING,
        allowNull:false
      },
      age:{
        type: DataTypes.INTEGER, 
      },
      // gender:{
      //   type: DataTypes.ENUM("male", "female")
      // }
      // gender: {
      //   type: DataTypes.STRING,  // Use STRING instead of ENUM
      //   allowNull: false,
      //   validate: {
      //     isIn: [['male', 'female']]  // Ensures only these values are accepted in Sequelize
      //   }
      // }
      gender: {
        type: DataTypes.STRING,  // Use STRING instead of ENUM
        allowNull: false,
        validate: {
          isIn: [['male', 'female']]  // Ensures only these values are accepted in Sequelize
        }
      },

    pocketmoney: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    academicYear: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true 
});




module.exports = Student;
