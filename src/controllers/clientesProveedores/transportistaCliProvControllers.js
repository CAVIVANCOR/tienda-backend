const {TransportistaCliProv} = require("../../db");

const getAllTransportistaCliProv= async ()=>{
    let databaseTransportistaCliProv = await TransportistaCliProv.findAll();
    return databaseTransportistaCliProv;
};

module.exports = {getAllTransportistaCliProv};