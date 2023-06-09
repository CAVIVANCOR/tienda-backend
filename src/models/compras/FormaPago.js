const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("FormaPago",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        nDias:{
            type:DataTypes.INTEGER,
        },
        contado:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        tipo:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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
        tableName: "FormaPago"
    }
    )
}