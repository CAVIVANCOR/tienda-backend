const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("CorrelativoDoc",{
        id:{
            type:DataTypes.INTEGER,
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
