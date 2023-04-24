const {Acceso} = require("../db");

const getAllAccesos= async ()=>{
    let databaseAccesos = await Acceso.findAll();
    return databaseAccesos;
};

module.exports = {getAllAccesos};