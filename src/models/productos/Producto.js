const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Producto",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codigoProveedor:{
            type:DataTypes.STRING,
        },
        modeloFabricante:{
            type:DataTypes.STRING,
        },
        stockMinimo:{
            type:DataTypes.DECIMAL(12,2),
        },
        stockMaximo:{
            type:DataTypes.DECIMAL(12,2),
        },
        urlFotoProducto:{
            type:DataTypes.STRING,
        },
        urlWebProductoFabricante:{
            type:DataTypes.STRING,
        },
        valorVentaUnitMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        valorVentaUnitME:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeMaxDescConAutorizacion:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeMaxDescSinAutorizacion:{
            type:DataTypes.DECIMAL(12,2),
        },
        porcentajeMaxDescPorCantidad:{
            type:DataTypes.DECIMAL(12,2),
        },
        cantidadAplicaDesc:{
            type:DataTypes.DECIMAL(12,2),
        },
        moneda:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        noKardex:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        listaPrecios:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        costoUnitarioMN:{
            type:DataTypes.DECIMAL(12,2),
        },
        nroMesesGarantia:{
            type:DataTypes.INTEGER,
        },
        costoUnitarioME:{
            type:DataTypes.DECIMAL(12,2),
        },
        mostrarFamiliaDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        mostrarSubFamiliaDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        mostrarLadoDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        mostrarMarcaDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        mostrarModelosDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        mostrarAnosDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        mostrarMaterialDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        mostrarColorDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        mostrarProcedenciaDescripcion:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        seriado:{
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
    },
    {
        timestamps:false,
        tableName: "Producto"
    }
    )
}
