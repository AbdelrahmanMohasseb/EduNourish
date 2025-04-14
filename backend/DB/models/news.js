const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const News = sequelize.define("News", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("trip", "competition", "concert", "general"),
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING, // Stores the image URL (Cloudinary later)
    allowNull: true, 
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, { 
  timestamps: true,
});

module.exports = News;
