const {CuentasBancariasCliProv} = require("../../db");

const getAllCuentasBancariasCliProv= async ()=>{
    let databaseCuentasBancariasCliProv = await CuentasBancariasCliProv.findAll();
    return databaseCuentasBancariasCliProv;
};

module.exports = {getAllCuentasBancariasCliProv};