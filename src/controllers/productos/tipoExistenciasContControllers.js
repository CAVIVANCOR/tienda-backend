const {TipoExisCont} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTipoExistenciaCont = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoExisCont.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllTipoExistenciaCont= async ()=>{
    let databaseTipoExistenciaCont = null;
    let apiTipoExistenciaContRaw = null;
    let apiTipoExistenciaCont = null;
    databaseTipoExistenciaCont = await TipoExisCont.findAll();
    if (databaseTipoExistenciaCont.length===0){
        apiTipoExistenciaContRaw = (await axios.get('http://192.168.18.15:82/tiposExistenciasContProductos')).data;
        apiTipoExistenciaCont = await cleanArray(apiTipoExistenciaContRaw);
        await cargaBDTipoExistenciaCont(apiTipoExistenciaCont);
        databaseTipoExistenciaCont = await TipoExisCont.findAll();
    }
    return databaseTipoExistenciaCont;
};

const createTipoExistenciaCont = async (regTipoExistenciaCont)=>{
    const transactionCrearTipoExistenciaCont = await TipoExisCont.sequelize.transaction();
    try {
        let maxIdTipoExistenciaCont = await TipoExisCont.max("id", {transaction:transactionCrearTipoExistenciaCont});
        let newTipoExistenciaCont = await TipoExisCont.create({id:maxIdTipoExistenciaCont+1, ...regTipoExistenciaCont},{transaction:transactionCrearTipoExistenciaCont});
        await transactionCrearTipoExistenciaCont.commit();
        console.log('Registro creado OK Tabla TipoExisCont')
        return newTipoExistenciaCont;
    } catch (error) {
        await transactionCrearTipoExistenciaCont.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllTipoExistenciaCont,createTipoExistenciaCont};