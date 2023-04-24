const {Rol} = require("../db");

const getAllRoles= async ()=>{
    let databaseRoles = await Rol.findAll();
    return databaseRoles;
};

module.exports = {getAllRoles};