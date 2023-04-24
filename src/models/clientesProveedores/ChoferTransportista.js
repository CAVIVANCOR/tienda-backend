const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("ChoferTransportista",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        nro_licencia:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        cod_cliprov:{
            type:DataTypes.BIGINT,
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
