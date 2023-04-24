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
        dirFiscal:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        codDirFiscal:{
            type:DataTypes.BIGINT,
            allowNull:false,
        },
        dirGuiaPrincipal:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        codDirGuiaPrincipal:{
            type:DataTypes.BIGINT,
            allowNull:false,
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
        cliente:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        proveedor:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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
