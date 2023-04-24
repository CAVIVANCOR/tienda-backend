const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Usuario",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        password:{
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
        idHistorico:{
            type:DataTypes.INTEGER,
        },
    },
    {timestamps:false}
    )
}
