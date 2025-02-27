const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB"); // Adjust the path to your DB config

const Advisor = sequelize.define("Advisor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
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
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "advisor", // Default role
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
