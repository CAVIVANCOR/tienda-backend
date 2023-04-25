const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ChoferTransportista",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        nroLicencia:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        nroDocIdentidad:{
            type:DataTypes.STRING,
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
