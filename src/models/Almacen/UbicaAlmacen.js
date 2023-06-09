const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("UbicaAlmacen",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcionBase:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        descripcionDetallada:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        descripcionArmada:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        corredor:{
            type:DataTypes.STRING,
            defaultValue:"1"
        },
        estanteria:{
            type:DataTypes.STRING,
            defaultValue:"1"
        },
        nivel:{
            type:DataTypes.STRING,
            defaultValue:"1"
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
        tableName: "UbicaAlmacen"
    }
    )
}