const {GrupoCentroCostos} = require("../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDGrupoCentroCostos = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await GrupoCentroCostos.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllGrupoCentroCostos= async ()=>{
    let databaseGrupoCentroCostos = null;
    let apiGrupoCentroCostosRaw = null;
    let apiGrupoCentroCostos = null;
    databaseGrupoCentroCostos = await GrupoCentroCostos.findAll();
    if (databaseGrupoCentroCostos.length===0){
        apiGrupoCentroCostosRaw = (await axios.get('http://192.168.18.15:82/grupoCentroCostos')).data;
        apiGrupoCentroCostos = await cleanArray(apiGrupoCentroCostosRaw);
        await cargaBDGrupoCentroCostos(apiGrupoCentroCostos);
        databaseGrupoCentroCostos = await GrupoCentroCostos.findAll();
    }
    return databaseGrupoCentroCostos;
};

module.exports = {getAllGrupoCentroCostos};