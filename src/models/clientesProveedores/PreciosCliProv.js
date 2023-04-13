const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("PreciosCliProv",{
        id:{
            type:DataTypes.BIGINT,
            primaryKey:true,
        },
        fechaDesde:{
            type:DataTypes.DATEONLY,
            allowNull: false,
        },
        fechaHasta:{
            type:DataTypes.DATEONLY,
            allowNull: false,
        },
        moneda:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        valorVentaUnit:{
            type:DataTypes.DECIMAL(12,2),
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
    },
    {timestamps:false}
    )
}
