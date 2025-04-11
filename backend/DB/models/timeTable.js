const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");
const Student = require("./student");

const Timetable = sequelize.define("Timetable", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      studentId: {  
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Students",
          key: "id"
        },
        onDelete: "CASCADE"
      }

},
{
    timestamps: true 

});

// Student.hasMany(Timetable, { foreignKey: "id", onDelete: "CASCADE" });
//Timetable.belongsTo(Student, { foreignKey: "studentId", onDelete: "CASCADE" });

module.exports = Timetable;
