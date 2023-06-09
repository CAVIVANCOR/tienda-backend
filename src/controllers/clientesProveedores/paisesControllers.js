const {Pais} = require("../../db");
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
                await Pais.create(element);
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
    databasePais = await Pais.findAll();
    if (databasePais.length===0){
        apiPaisRaw = (await axios.get('http://192.168.18.15:82/paises')).data;
        apiPais = await cleanArray(apiPaisRaw);
        await cargaBDPais(apiPais);
        databasePais = await Pais.findAll();
    }
    return databasePais;
};

const createPais = async (regPais)=>{
    const transactionCrearPais = await Pais.sequelize.transaction();
    try {
        //await Pais.sequelize.query('Lock Table Pais',{transaction:transactionCrearPais});
        let maxIdPais = await Pais.max('id',{transaction:transactionCrearPais});
        let newPais = await Pais.create({id:maxIdPais+1, ...regPais},{transaction:transactionCrearPais});
        await transactionCrearPais.commit();
        console.log('Registro creado OK Tabla Pais')
        return newPais;
    } catch (error) {
        await transactionCrearPais.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllPais,createPais};