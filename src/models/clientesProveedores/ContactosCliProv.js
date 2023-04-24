const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ContactosCliProv",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        nombreCompleto:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        cargo:{
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
        idHistorico:{
            type:DataTypes.INTEGER,
        },
    },
    {timestamps:false}
    )
}
