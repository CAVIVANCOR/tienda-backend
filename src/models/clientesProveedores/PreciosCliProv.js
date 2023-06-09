const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("PreciosCliProv",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        fechaDesde:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW,
        },
        fechaHasta:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW,
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
    {
        timestamps:false,
        tableName: "PreciosCliProv"
    }
    )
}
