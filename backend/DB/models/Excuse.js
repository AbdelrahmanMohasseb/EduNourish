const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB"); 
 const Excuse = sequelize.define("Excuse", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
            allowNull: true,
            references: {
                model: "Parents",
                key: "id"
            }
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending"
        }
     } ,
        {
            timestamps: true ,
            tableName: "Excuses",
        
        });

        module.exports = Excuse;
