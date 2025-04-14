const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB"); // Ensure the path is correct

const Organizer = sequelize.define("Organizer", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
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
  // gender: {
  //   type: DataTypes.ENUM("male", "female"),
  // }
  gender: {
    type: DataTypes.STRING,  // Use STRING instead of ENUM
    allowNull: false,
    validate: {
      isIn: [['male', 'female']]  // Ensures only these values are accepted in Sequelize
    }
  },
  
  // Organizer-specific attributes
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

// ✅ Export the model properly
module.exports = Organizer;
