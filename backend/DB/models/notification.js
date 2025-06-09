const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Notification = sequelize.define("Notification", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM("attendance", "assignment", "exam", "general"),
    allowNull: false,
    defaultValue: "attendance"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  parentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Parents",
      key: "id"
    }
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: "Students", 
      key: "id"
    }
  },
  attendanceId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: "Attendances",
      key: "id"
    }
  }
}, {
  timestamps: true
});

module.exports = Notification;
