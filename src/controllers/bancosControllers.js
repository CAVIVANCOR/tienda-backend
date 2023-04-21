const {Bancos} = require("../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            abreviacion:elem.abreviacion,
        };
    });
    return clean;
};

const cargaBDBancos = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Bancos.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllBancos= async ()=>{
    let databaseBancos = null;
    let apiBancosRaw = null;
    let apiBancos = null;
    databaseBancos = await Bancos.findAll();
    if (databaseBancos.length===0){
        apiBancosRaw = (await axios.get('http://192.168.18.15:82/bancos')).data;
        apiBancos = await cleanArray(apiBancosRaw);
        await cargaBDBancos(apiBancos);
        databaseBancos = await Bancos.findAll();
    }
    return databaseBancos;
};

module.exports = {getAllBancos};