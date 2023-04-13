const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("DistritoUbigeo",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codSunat:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codPostal:{
            type:DataTypes.STRING,
        },
        origen:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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