const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB"); 

 const Excuse = sequelize.define("Excuse", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        studentId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Students",
                key: "id"
            }
        },
        parentId: {
            type: DataTypes.STRING,
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
        
        });

        module.exports = Excuse;