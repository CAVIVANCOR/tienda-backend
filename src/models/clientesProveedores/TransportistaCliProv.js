const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("TransportistaCliProv",{
        id:{
            type:DataTypes.BIGINT,
            primaryKey:true,
        },
        marca_vehiculo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        placa_vehiculo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        certificado_vehiculo:{
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
    },
    {timestamps:false}
    )
}
