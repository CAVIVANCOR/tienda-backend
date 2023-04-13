const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Usuario",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        nombres:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        cesado:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        borradoLogico:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
    },
    {timestamps:false}
    )
}