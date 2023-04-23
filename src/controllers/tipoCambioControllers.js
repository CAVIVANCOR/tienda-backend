const {TipoCambio} = require("../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            idHistorico:elem.id,
            fecha:elem.fecha,
            compra:elem.compra,
            venta:elem.venta,
        };
    });
    return clean;
};

const cargaBDTiposCambio = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoCambio.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllTiposCambio= async ()=>{
    let databaseTiposCambio = null;
    let apiTiposCambioRaw = null;
    let apiTiposCambio = null;
    databaseTiposCambio = await TipoCambio.findAll();
    if (databaseTiposCambio.length===0){
        apiTiposCambioRaw = (await axios.get('http://192.168.18.15:82/tiposCambio')).data;
        apiTiposCambio = await cleanArray(apiTiposCambioRaw);
        await cargaBDTiposCambio(apiTiposCambio);
        databaseTiposCambio = await TipoCambio.findAll();
    }
    return databaseTiposCambio;
};

module.exports = {getAllTiposCambio};