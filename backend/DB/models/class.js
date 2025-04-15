const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");
const Timetable = require("./timeTable");

const Class = sequelize.define("Class", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    className: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    timestamps: true,
    
});

module.exports = Class;