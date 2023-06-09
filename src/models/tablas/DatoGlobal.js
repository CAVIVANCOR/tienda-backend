const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("DatoGlobal",{
        id:{
            type:DataTypes.INTEGER,
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
        urlLogoEmpresa:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        numDocIdentidad:{
            type:DataTypes.STRING,
            unique:true,
        },
        monedaDefault:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        descripCortaMN:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        descripCortaME:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        descripLargaMN:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        descripLargaME:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        porcentajeIGV:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeDescSinAutorizacion:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeDescConAutorizacion:{
            type:DataTypes.DECIMAL(12,2),
        },
        urlDocumentosGenerados:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        porcentajeCalcCostoProdSalarios:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeCalcCostoProdAdmin:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeCalcCostoProdEnvasesEmbalajes:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeCalcCostoProdCombustibles:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeCalcCostoProdImpuestos:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeCalcCostoProdComisionesOtros:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeCalcVVentaProdRentabilidad:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeCalcVVentaServicioRentabilidad:{
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
    },
    {
        timestamps:false,
        tableName: "DatoGlobal"
    }
    )
}
//**Formula Valor Venta Producto: ValorVenta=Costo*(100/(100-Rentabilidad) */
//**Costo de Ventas = Inventario Inicial mercaderias + Costo de Compras - Inventario final de mercaderia */