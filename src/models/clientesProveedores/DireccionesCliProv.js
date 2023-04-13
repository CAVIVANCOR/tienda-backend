const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("DireccionesCliProv",{
        id:{
            type:DataTypes.BIGINT,
            primaryKey:true,
        },
        direccion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codUbigeo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        ubigeo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        telefonos:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        principal:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        fiscal:{
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
