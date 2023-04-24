const {TipoDocIdentidad} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
        };
    });
    return clean;
};

const cargaBDTDI = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoDocIdentidad.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllTDI= async ()=>{
    let databaseTDI = null;
    let apiTDIRaw = null;
    let apiTDI = null;
    databaseTDI = await TipoDocIdentidad.findAll();
    if (databaseTDI.length===0){
        apiTDIRaw = (await axios.get('http://192.168.18.15:82/tipoDocIdentidad')).data;
        console.log("Hola")
        apiTDI = await cleanArray(apiTDIRaw);
        await cargaBDTDI(apiTDI);
        databaseTDI = await TipoDocIdentidad.findAll();
    }
    return databaseTDI;
};

module.exports = {getAllTDI};