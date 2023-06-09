const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ClienteProveedor",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        razonSocial:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        nombreComercial:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        numDocIdentidad:{
            type:DataTypes.STRING,
            unique:true,
        },
        telefonos:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
        },
        emailFactSunat:{
            type:DataTypes.STRING,
        },
        monedaLineaCredito:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        lineaCreditoMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        lineaCreditoME:{
            type:DataTypes.DECIMAL(12,2),
        },
        saldoAnticiposMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        saldoAnticiposME:{
            type:DataTypes.DECIMAL(12,2),
        },
        monedaMontoAplicaDesc:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        porcentajeDesc:{
            type:DataTypes.DECIMAL(12,2),
        },
        montoAplicaDescMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        montoAplicaDescME:{
            type:DataTypes.DECIMAL(12,2),
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
        codDirFiscal:{
            type:DataTypes.STRING,
        },
        dirFiscal:{
            type:DataTypes.STRING,
        },
        codDirGuia:{
            type:DataTypes.STRING,
        },
        dirGuia:{
            type:DataTypes.STRING,
        },
    },
    {
        timestamps:false,
        tableName: "ClienteProveedor"
    }
    )
}
