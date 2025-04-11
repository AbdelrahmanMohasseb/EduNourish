const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Students", 
      key: "id"
    }
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Parents", 
      key: "id"
    }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "cash, bank, wallet,paypal" 
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "comple,tedpending, failed" 
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
});

module.exports = Payment;
