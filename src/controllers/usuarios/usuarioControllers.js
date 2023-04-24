const {Usuario} = require("../../db");

const getAllusuarios= async ()=>{
    let databaseUsuarios = await Usuario.findAll();
    return databaseUsuarios;
};

module.exports = {getAllusuarios};