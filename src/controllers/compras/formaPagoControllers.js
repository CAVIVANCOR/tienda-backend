const {FormaPago} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            nDias:elem.nDias,
            contado:elem.contado,
            tipo:elem.tipo,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDFormaPago = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await FormaPago.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllFormaPago= async ()=>{
    let databaseFormaPago = null;
    let apiFormaPagoRaw = null;
    let apiFormaPago = null;
    databaseFormaPago = await FormaPago.findAll();
    if (databaseFormaPago.length===0){
        apiFormaPagoRaw = (await axios.get('http://192.168.18.15:82/formasPago')).data;
        apiFormaPago = await cleanArray(apiFormaPagoRaw);
        await cargaBDFormaPago(apiFormaPago);
        databaseFormaPago = await FormaPago.findAll();
    }
    return databaseFormaPago;
};

const createFormaPago = async (regFormaPago)=>{
    const transactionCrearFormaPago = await FormaPago.sequelize.transaction();
    try {
        await FormaPago.sequelize.query('Lock Table FormaPago',{transaction:transactionCrearFormaPago});
        let maxIdFormaPago = await FormaPago.max("id", {transaction:transactionCrearFormaPago});
        let newFormaPago = await FormaPago.create({id:maxIdFormaPago+1, ...regFormaPago},{transaction:transactionCrearFormaPago});
        await transactionCrearFormaPago.commit();
        console.log('Registro creado OK Tabla FormaPago')
        return newFormaPago;
    } catch (error) {
        await transactionCrearFormaPago.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllFormaPago,createFormaPago};