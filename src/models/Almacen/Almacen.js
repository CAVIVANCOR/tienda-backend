const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Almacen",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        kardex:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        direccion:{
            type:DataTypes.STRING,
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
        tableName: "Almacen"
    }
    )
}