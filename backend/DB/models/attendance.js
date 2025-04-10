const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Attendance = sequelize.define("Attendance", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      
    },
    date: {  
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("present", "absent", "late", "excused"),
        allowNull: false
    },
    remarks: {                     // Notes (sick)
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, {
    timestamps: true
});

module.exports = Attendance;
