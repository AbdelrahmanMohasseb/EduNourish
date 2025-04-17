const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const InstructionAI = sequelize.define("InstructionAI", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },


  parentId: {
    type: DataTypes.STRING,
    references: {
      model: 'Parents',
      key: 'id',
    },
}

},
{

timestamps: false

});



module.exports = InstructionAI;