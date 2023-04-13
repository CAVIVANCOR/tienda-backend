const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("TipoExistenciaCont",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        codSunat:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
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
