const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("CorrelativoDoc",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        serie:{
            type:DataTypes.STRING,
        },
        correlativo:{
            type:DataTypes.BIGINT,
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
