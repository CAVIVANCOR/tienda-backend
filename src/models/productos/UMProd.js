const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("UMProd",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        codSunat:{
            type:DataTypes.STRING,
        },
        abreviacion:{
            type:DataTypes.STRING,
        },
        conversion:{
            type:DataTypes.DECIMAL(12,2),
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
        tableName: "UMProd"
    }
    )
}
