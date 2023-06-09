const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ConceptoAlmacen",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codAlmacenOrigen:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        codAlmacenDestino:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        prioridad:{
            type:DataTypes.INTEGER,
            defaultValue:1,
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
        tableName: "ConceptoAlmacen"
    }
    )
}