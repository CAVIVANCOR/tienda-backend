const {ContactosCliProv} = require("../../db");

const getAllContactosCliProv= async ()=>{
    let databaseContactosCliProv = await ContactosCliProv.findAll();
    return databaseContactosCliProv;
};

module.exports = {getAllContactosCliProv};