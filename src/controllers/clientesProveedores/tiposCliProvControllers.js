const {TipoCliProv} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            clienteProveedor:elem.clienteProveedor,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTipoCliProv = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoCliProv.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllTipoCliProv= async ()=>{
    let databaseTipoCliProv = null;
    let apiTipoCliProvRaw = null;
    let apiTipoCliProv = null;
    databaseTipoCliProv = await TipoCliProv.findAll();
    if (databaseTipoCliProv.length===0){
        apiTipoCliProvRaw = (await axios.get('http://192.168.18.15:82/tiposCliProv')).data;
        apiTipoCliProv = await cleanArray(apiTipoCliProvRaw);
        await cargaBDTipoCliProv(apiTipoCliProv);
        databaseTipoCliProv = await TipoCliProv.findAll();
    }
    return databaseTipoCliProv;
};

module.exports = {getAllTipoCliProv};