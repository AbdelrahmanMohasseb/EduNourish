const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
  },
 
  amount: {
    type: DataTypes.FLOAT, // In cents
    allowNull: false
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
        model: "Students",
        key: "id"
    }
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
    defaultValue: "pocketmoney"
  }
}, {
  timestamps: true,
});

module.exports = Payment;