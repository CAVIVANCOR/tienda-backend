const {DataTypes} = require("sequelize");

module.exports = (sequelize)=>{
    sequelize.define("KardexAlmacen",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        fecha:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW,
        },
        ingEgr:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        saldoIniCant:{
            type:DataTypes.DECIMAL(12,2),
        },
        costoUnitProm:{
            type:DataTypes.DECIMAL(12,2),
        },
        saldoIniCTotMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        cantidad:{
            type:DataTypes.DECIMAL(12,2),
        },
        valorUnitMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        saldoFinCant:{
            type:DataTypes.DECIMAL(12,2),
        },
        saldoFinCTotMN:{
            type:DataTypes.DECIMAL(12,2),
        },
    },
    {
        timestamps:false,
        tableName: "KardexAlmacen"
    }
    )
}