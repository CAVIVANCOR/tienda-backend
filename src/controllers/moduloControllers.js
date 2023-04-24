const {Modulo} = require("../db");

const getAllModulos= async ()=>{
    let databaseModulos = await Modulo.findAll();
    return databaseModulos;
};

module.exports = {getAllModulos};