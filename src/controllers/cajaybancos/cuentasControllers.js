const {Cuentas} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            nroCuenta:elem.nroCuenta,
            kardex:elem.kardex,
            moneda:elem.moneda,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCuentas = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Cuentas.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllCuentas= async ()=>{
    let databaseCuentas = null;
    let apiCuentasRaw = null;
    let apiCuentas = null;
    databaseCuentas = await Cuentas.findAll();
    if (databaseCuentas.length===0){
        apiCuentasRaw = (await axios.get('http://192.168.18.15:82/cuentas')).data;
        apiCuentas = await cleanArray(apiCuentasRaw);
        await cargaBDCuentas(apiCuentas);
        databaseCuentas = await Cuentas.findAll();
    }
    return databaseCuentas;
};

const createCuentas = async (regCuentas)=>{
    const transactionCrearCuentas = await Cuentas.sequelize.transaction();
    try {
        let maxIdCuentas = await Cuentas.max('id',{transaction:transactionCrearCuentas});
        let newCuentas = await Cuentas.create({id:maxIdCuentas+1, ...regCuentas},{transaction:transactionCrearCuentas});
        await transactionCrearCuentas.commit();
        console.log('Registro creado OK Tabla Cuentas')
        return newCuentas;
    } catch (error) {
        await transactionCrearCuentas.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllCuentas,createCuentas};