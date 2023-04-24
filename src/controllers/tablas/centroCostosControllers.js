const {CentroCosto} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            tipoIngEgr:elem.tipoIngEgr,
            calcUtilidades:elem.calcUtilidades,
            SubGrupoCentroCostoId:elem.SubGrupoCentroCostoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCentroCosto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await CentroCosto.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllCentroCosto= async ()=>{
    let databaseCentroCosto = null;
    let apiCentroCostoRaw = null;
    let apiCentroCosto = null;
    databaseCentroCosto = await CentroCosto.findAll();
    if (databaseCentroCosto.length===0){
        apiCentroCostoRaw = (await axios.get('http://192.168.18.15:82/centroCostos')).data;
        apiCentroCosto = await cleanArray(apiCentroCostoRaw);
        await cargaBDCentroCosto(apiCentroCosto);
        databaseCentroCosto = await CentroCosto.findAll();
    }
    return databaseCentroCosto;
};

module.exports = {getAllCentroCosto};