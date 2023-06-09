const {DataTypes} = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define("KardexCuentas",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        fecha:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW,
        },
        tipoCambio:{
            type:DataTypes.DECIMAL(12,2),
        },
        moneda:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        ingEgr:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        saldoIni:{
            type:DataTypes.DECIMAL(12,2),
        },
        importe:{
            type:DataTypes.DECIMAL(12,2),
        },
        saldoFin:{
            type:DataTypes.DECIMAL(12,2),
        },
    },
    {
        timestamps:false,
        tableName: "KardexCuentas"
    }
    )
}