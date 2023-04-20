const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ConceptoAlmacen",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codAlmacenOrigen:{
            type:DataTypes.INTEGER,
            defaultValue:false
        },
        codAlmacenDestino:{
            type:DataTypes.INTEGER,
            defaultValue:false
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