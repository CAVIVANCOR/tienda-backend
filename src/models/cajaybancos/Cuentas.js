const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Cuentas",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        nroCuenta:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        kardex:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        moneda:{
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
        tableName: "Cuentas"
    }
    )
}
