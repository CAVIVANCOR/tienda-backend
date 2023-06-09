const {TipoDocumento} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            cesado:elem.cesado,
            iniciales:elem.iniciales,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTiposDoc = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoDocumento.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllTiposDoc= async ()=>{
    let databaseTiposDoc = null;
    let apiTiposDocRaw = null;
    let apiTiposDoc = null;
    databaseTiposDoc = await TipoDocumento.findAll();
    if (databaseTiposDoc.length===0){
        apiTiposDocRaw = (await axios.get('http://192.168.18.15:82/tiposDocumento')).data;
        apiTiposDoc = await cleanArray(apiTiposDocRaw);
        await cargaBDTiposDoc(apiTiposDoc);
        databaseTiposDoc = await TipoDocumento.findAll();
    }
    return databaseTiposDoc;
};

const createTipoDoc = async (regTipoDoc)=>{
    const transactionCrearTipoDoc = await TipoDocumento.sequelize.transaction();
    try {
        //await TipoDocumento.sequelize.query('Lock Table TipoDocumento',{transaction:transactionCrearTipoDoc});
        let maxIdTipoDoc = await TipoDocumento.max('id',{transaction:transactionCrearTipoDoc});
        let newTipoDoc = await TipoDocumento.create({id:maxIdTipoDoc+1, ...regTipoDoc},{transaction:transactionCrearTipoDoc});
        await transactionCrearTipoDoc.commit();
        console.log('Registro creado OK Tabla TipoDocumento')
        return newTipoDoc;
    } catch (error) {
        await transactionCrearTipoDoc.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllTiposDoc,createTipoDoc};