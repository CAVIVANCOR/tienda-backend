const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("UMProducto",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        conversion:{
            type:DataTypes.DECIMAL(12,2),
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
