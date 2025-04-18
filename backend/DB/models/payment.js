const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");
const Student = require("./student");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Students",
      key: "id"
    }
  },
  amount: {
    type: DataTypes.FLOAT, // In cents
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "usd"
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  },
  stripeSessionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING, // 'checkout' or 'pocketmoney'
    defaultValue: "checkout"
  }
}, {
  timestamps: true,
});

module.exports = Payment;