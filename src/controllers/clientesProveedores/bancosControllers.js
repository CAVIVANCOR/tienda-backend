const {Bancos} = require("../../db");
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

const createBancos = async (regBancos)=>{
    const transactionCrearBancos = await Bancos.sequelize.transaction();
    try {
       // await Bancos.sequelize.query('Lock Table Bancos',{transaction:transactionCrearBancos});
        let maxIdBancos = await Bancos.max("id", {transaction:transactionCrearBancos});
        let newBancos = await Bancos.create({id:maxIdBancos+1, ...regBancos},{transaction:transactionCrearBancos});
        await transactionCrearBancos.commit();
        console.log('Registro creado OK Tabla Bancos')
        return newBancos;
    } catch (error) {
        await transactionCrearBancos.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllBancos,createBancos};