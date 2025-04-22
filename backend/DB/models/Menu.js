const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

    const Menu = sequelize.define("Menu", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.STRING,
            allowNull:true
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
        timestamps: true 
    
    });
    
    module.exports=Menu;