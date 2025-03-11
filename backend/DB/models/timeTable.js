const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");
const Student = require("./student");

const Timetable = sequelize.define("Timetable", {
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
    }

},
{
    timestamps: true 

});

Student.hasMany(Timetable, { foreignKey: "id", onDelete: "CASCADE" });
Timetable.belongsTo(Student, { foreignKey: "id" });

module.exports = Timetable;
