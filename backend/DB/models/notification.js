const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  receiverId: {
    type: DataTypes.STRING, // User who will receive the notification
    allowNull: false,
  },
  senderId: {
    type: DataTypes.STRING, // User who sent the notification
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("news", "advisorMessage", "organizerMessage", "general"),
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Notification;
