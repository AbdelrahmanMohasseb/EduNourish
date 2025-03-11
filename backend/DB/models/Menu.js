const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connectDB");

    const Menu = sequelize.define("Menu", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        timestamps: true 
    
    });
    
    module.exports=Menu;
