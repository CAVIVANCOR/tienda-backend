const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("TipoExisCont",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
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
    },
    {
        timestamps:false,
        tableName: "TipoExisCont"
    }
    )
}
