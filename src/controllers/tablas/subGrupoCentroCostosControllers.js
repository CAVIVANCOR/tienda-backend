const {SubGrupoCentroCosto} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            GrupoCentroCostoId:elem.GrupoCentroCostoId,
            codSunat:elem.codSunat,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDSubGrupoCentroCosto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await SubGrupoCentroCosto.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllSubGrupoCentroCosto= async ()=>{
    let databaseSubGrupoCentroCosto = null;
    let apiSubGrupoCentroCostoRaw = null;
    let apiSubGrupoCentroCosto = null;
    databaseSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll();
    if (databaseSubGrupoCentroCosto.length===0){
        apiSubGrupoCentroCostoRaw = (await axios.get('http://192.168.18.15:82/subGrupoCentroCostos')).data;
        apiSubGrupoCentroCosto = await cleanArray(apiSubGrupoCentroCostoRaw);
        await cargaBDSubGrupoCentroCosto(apiSubGrupoCentroCosto);
        databaseSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll();
    }
    return databaseSubGrupoCentroCosto;
};

module.exports = {getAllSubGrupoCentroCosto};