const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("TransportistaCliProv",{
        id:{
            type:DataTypes.BIGINT,
            autoIncrement:true,
            primaryKey:true,
        },
        marcaVehiculo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        placaVehiculo:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        certificadoVehiculo:{
            type:DataTypes.STRING,
        },
        nroDocIdentidad:{
            type:DataTypes.STRING,
        },
        created:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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
