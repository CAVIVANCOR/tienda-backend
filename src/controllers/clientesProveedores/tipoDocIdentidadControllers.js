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

const createTDI = async (regTDI)=>{
    const transactionCrearTDI = await TipoDocIdentidad.sequelize.transaction();
    try {
        //await TipoDocIdentidad.sequelize.query('Lock Table TipoDocIdentidad',{transaction:transactionCrearTDI});
        let maxIdTDI = await TipoDocIdentidad.max('id',{transaction:transactionCrearTDI});
        let newTDI = await TipoDocIdentidad.create({id:maxIdTDI+1, ...regTDI},{transaction:transactionCrearTDI});
        await transactionCrearTDI.commit();
        console.log('Registro creado OK Tabla TipoDocIdentidad')
        return newTDI;
    } catch (error) {
        await transactionCrearTDI.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllTDI,createTDI};