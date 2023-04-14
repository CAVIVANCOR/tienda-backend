const {DataTypes} = require("sequelize");
module.exports = (sequelize)=>{
    sequelize.define("Rol",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        descripcion:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        superUsuario:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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

// rol:{
//     type:DataTypes.ENUM("SELLER","ADMIN","MANAGER","WAREHOUSE","ACCOUNTANT"),
//     defaultValue:"SELLER",
// },