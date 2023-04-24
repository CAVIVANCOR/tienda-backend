const {SubModulo} = require("../db");

const getAllSubModulos= async ()=>{
    let databaseSubModulos = await SubModulo.findAll();
    return databaseSubModulos;
};

module.exports = {getAllSubModulos};