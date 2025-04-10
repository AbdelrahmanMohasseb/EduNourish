const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Alarm = sequelize.define("Alarm", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
     
    },
    senderType: {
        type: DataTypes.ENUM("organizer", "teacher", "system", "advisor"),
        allowNull: false
    },
    
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    receiverType: { 
        type: DataTypes.ENUM("student", "teacher","parent", "all"),
        allowNull: false
    },
    receiverId: { 
        type: DataTypes.INTEGER,
        allowNull: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: { 
        type: DataTypes.ENUM("read", "unread"),
        defaultValue: "unread"
    }
}, {
    timestamps: true
});

module.exports = Alarm;
