const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Subject = sequelize.define("Subject", {
   
    SubjectID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gradeLevel: {
        type: DataTypes.ENUM(
            "Kindergarten", 
            "Primary", 
            "Middle School", 
            "High School"
        ),
        allowNull: false 
    },
     semester: {  
         type: DataTypes.ENUM("First", "Second"),
         allowNull: false
     },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    studentId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Students", // تأكد إن اسم الجدول فعليًا "Students"
          key: "id"
        }
    }
    

}, {
    timestamps: true
});

module.exports = Subject ;