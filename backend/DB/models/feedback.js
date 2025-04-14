const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Feedback = sequelize.define("Feedback", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER, // Automatically associated with parent
    allowNull: false,
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderPhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  feedbackMessage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  messageType: {
    type: DataTypes.ENUM("feedback", "testimonial"),
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING, // Automatically associated with parent’s child
    allowNull: false,
  },
}, { 
  timestamps: true,
});

module.exports = Feedback;
