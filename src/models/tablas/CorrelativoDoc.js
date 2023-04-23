const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("CorrelativoDoc",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        serie:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        correlativo:{
            type:DataTypes.BIGINT,
            allowNull: false,
        },
        nroCeros:{
            type:DataTypes.INTEGER,
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
    {timestamps:false}
    )
}
