const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");
const Parent=require('./parent');


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
      
      gender: {
        type: DataTypes.STRING,  
        allowNull: false,
        validate: {
          isIn: [['male', 'female']]  
        }
      },

    pocketmoney: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    academicYear: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parentId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Parents',
        key: 'id',
      },
    },
    classId: {
    type: DataTypes.STRING,
   allowNull: true,
   references: {
     model: 'Classes',  
     key: 'id',        
  },}
}, 
{
    timestamps: false 
});



module.exports = Student;
