const { DataTypes } = require("sequelize");
const sequelize = require('../config/connectDB');

const Bus = sequelize.define('Bus', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driverName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arrivalTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    departureTime: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Bus;