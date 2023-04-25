const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("CuentasBancariasCliProv",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        moneda:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        nroCuentaBancaria:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        nroCuentaInterbancaria:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        principal:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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
