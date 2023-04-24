const {DatoGlobal} = require("../db");

const getAllDatosGlobales= async ()=>{
    let databaseDatosGlobales = await DatoGlobal.findAll();
    return databaseDatosGlobales;
};

module.exports = {getAllDatosGlobales};