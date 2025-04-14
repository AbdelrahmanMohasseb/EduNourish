const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Exam = sequelize.define("Exam", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        
    },
    subjectName: { 
        type: DataTypes.STRING,
        allowNull: false
    },

    duration: {  //Minutes
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalMarks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    status: {  
        type: DataTypes.ENUM("scheduled", "ongoing", "completed"),
        allowNull: false
    },

    teacherID: {
        type: DataTypes.STRING,
        references: {
          model: 'Teachers',
          key: 'teacherID',
        },
        allowNull: false
      }
      
    
}, {
    timestamps: true
});


module.exports = Exam;
