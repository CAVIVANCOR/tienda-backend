const {PreciosCliProv} = require("../../db");

const getAllPreciosCliProv= async ()=>{
    let databasePreciosCliProv = await PreciosCliProv.findAll();
    return databasePreciosCliProv;
};

module.exports = {getAllPreciosCliProv};