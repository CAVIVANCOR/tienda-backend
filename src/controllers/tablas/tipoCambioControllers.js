const {TipoCambio} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            fecha:elem.fecha,
            compra:elem.compra,
            venta:elem.venta,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTiposCambio = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoCambio.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllTiposCambio= async ()=>{
    let databaseTiposCambio = null;
    let apiTiposCambioRaw = null;
    let apiTiposCambio = null;
    databaseTiposCambio = await TipoCambio.findAll();
    if (databaseTiposCambio.length===0){
        apiTiposCambioRaw = (await axios.get('http://192.168.18.15:82/tiposCambio')).data;
        apiTiposCambio = await cleanArray(apiTiposCambioRaw);
        await cargaBDTiposCambio(apiTiposCambio);
        databaseTiposCambio = await TipoCambio.findAll();
    }
    return databaseTiposCambio;
};

const createTiposCambio = async (regTiposCambio)=>{
    const transactionCrearTiposCambio = await TipoCambio.sequelize.transaction();
    try {
        //await TipoCambio.sequelize.query('Lock Table TipoCambio',{transaction:transactionCrearTiposCambio});
        let maxIdTiposCambio = await TipoCambio.max('id',{transaction:transactionCrearTiposCambio});
        let newTiposCambio = await TipoCambio.create({id:maxIdTiposCambio+1, ...regTiposCambio},{transaction:transactionCrearTiposCambio});
        await transactionCrearTiposCambio.commit();
        console.log('Registro creado OK Tabla TipoCambio')
        return newTiposCambio;
    } catch (error) {
        await transactionCrearTiposCambio.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllTiposCambio,createTiposCambio};