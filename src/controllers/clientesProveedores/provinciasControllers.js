const {ProvinciaUbigeo} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            origen:elem.origen,
            DepartamentoUbigeoId:elem.idDepartamento,
        };
    });
    return clean;
};

const cargaBDProvincia = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await ProvinciaUbigeo.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllProvincia= async ()=>{
    let databaseProvincias = null;
    let apiProvinciasRaw = null;
    let apiProvincias = null;
    databaseProvincias = await ProvinciaUbigeo.findAll();
    if (databaseProvincias.length===0){
        apiProvinciasRaw = (await axios.get('http://192.168.18.15:82/provincias')).data;
        apiProvincias = await cleanArray(apiProvinciasRaw);
        await cargaBDProvincia(apiProvincias);
        databaseProvincias = await ProvinciaUbigeo.findAll();
    }
    return databaseProvincias;
};

module.exports = {getAllProvincia};