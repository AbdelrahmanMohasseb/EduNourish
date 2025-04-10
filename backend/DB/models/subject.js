const { DataTypes } = require("sequelize");
const db = require("../config/connectDB");

const Subject = db.define("Subject", {
    id: {
        type: DataTypes.INTEGER,
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
    }
}, {
    timestamps: true
});

module.exports = Subject;
