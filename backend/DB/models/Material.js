const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const Material = sequelize.define("Material", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pdfUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  externalLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subjectId: {
    type: DataTypes.STRING,
    references: {
      model: 'Subjects',
      key: 'SubjectID',
      },
    }
 

});

module.exports = Material;
