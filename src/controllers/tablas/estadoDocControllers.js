const {EstadoDoc} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDEstadoDoc = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await EstadoDoc.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllEstadoDoc= async ()=>{
    let databaseEstadoDoc = null;
    let apiEstadoDocRaw = null;
    let apiEstadoDoc = null;
    databaseEstadoDoc = await EstadoDoc.findAll();
    if (databaseEstadoDoc.length===0){
        apiEstadoDocRaw = (await axios.get('http://192.168.18.15:82/estadosDoc')).data;
        apiEstadoDoc = await cleanArray(apiEstadoDocRaw);
        await cargaBDEstadoDoc(apiEstadoDoc);
        databaseEstadoDoc = await EstadoDoc.findAll();
    }
    return databaseEstadoDoc;
};

module.exports = {getAllEstadoDoc};