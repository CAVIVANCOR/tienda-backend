const {ChoferTransportista} = require("../../db");

const getAllChoferTransportista= async ()=>{
    let databaseChoferTransportista = await ChoferTransportista.findAll();
    return databaseChoferTransportista;
};

module.exports = {getAllChoferTransportista};