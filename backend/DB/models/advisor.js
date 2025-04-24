const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB"); // Adjust the path to your DB config

const Advisor = sequelize.define("Advisor", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING, // Store hashed password
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull:true,
  },
  gender: {
    type: DataTypes.STRING,  // Use STRING instead of ENUM
    allowNull: false,
  },

  // Advisor-specific attributes
  schoolName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  careerHistory: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable createdAt and updatedAt if not needed
});

module.exports = Advisor;
