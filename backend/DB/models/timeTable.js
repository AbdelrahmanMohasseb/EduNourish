const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Timetable = sequelize.define("Timetable", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    classId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Classes", 
            key: "id",
        }
    }
}, {
    timestamps: true,

});

module.exports = Timetable;
