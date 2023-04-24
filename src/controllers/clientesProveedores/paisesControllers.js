const {PaisUbigeo} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            origen:elem.origen,
        };
    });
    return clean;
};

const cargaBDPais = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await PaisUbigeo.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllPais= async ()=>{
    let databasePais = null;
    let apiPaisRaw = null;
    let apiPais = null;
    databasePais = await PaisUbigeo.findAll();
    if (databasePais.length===0){
        apiPaisRaw = (await axios.get('http://192.168.18.15:82/paises')).data;
        apiPais = await cleanArray(apiPaisRaw);
        await cargaBDPais(apiPais);
        databasePais = await PaisUbigeo.findAll();
    }
    return databasePais;
};

module.exports = {getAllPais};