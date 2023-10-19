const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("MotivoNCND",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codSunat:{
            type:DataTypes.STRING,
        },
        tipoNCND:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
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
        tableName: "MotivoNCND"
    }
    )
}
