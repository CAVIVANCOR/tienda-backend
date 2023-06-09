const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ConceptoMovC",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        idCuentaOrigen:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        idCuentaDestino:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        prioridad:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        created:{
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
        tableName: "ConceptoMovC"
    }
    )
}
