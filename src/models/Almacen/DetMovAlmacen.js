const {DataTypes} = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define("DetMovAlmacen",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        nroLote:{
            type:DataTypes.STRING,
        },
        nroEnvase:{
            type:DataTypes.STRING,
        },
        nroSerie:{
            type:DataTypes.STRING,
        },
        fechaProduccion:{
            type:DataTypes.DATEONLY,
        },
        fechaVencimiento:{
            type:DataTypes.DATEONLY,
        },
        cantidad:{
            type:DataTypes.DECIMAL(12,2),
            allowNull: false,
        },
        valorUnitMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        codUbicacionOrigen:{
            type:DataTypes.BIGINT,
            allowNull: false,
        },
        codUbicacionDestino:{
            type:DataTypes.BIGINT,
            allowNull: false,
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        borradoLogico:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        idHistorico:{
            type:DataTypes.BIGINT,
        },
    },
    {
        timestamps:false,
        tableName: "DetMovAlmacen"
    }
    )
}