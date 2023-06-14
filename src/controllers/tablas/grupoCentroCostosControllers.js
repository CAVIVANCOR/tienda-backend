const {GrupoCentroCostos,SubGrupoCentroCosto} = require("../../db");
const axios = require("axios");
const regGrupoCentroCostosUsuario ={
    where: { borradoLogico: false },
};
const {where,...regGrupoCentroCostosAdmin}=regGrupoCentroCostosUsuario;
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

const cargaBDGrupoCentroCostos = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await GrupoCentroCostos.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllGrupoCentroCostos= async (isAdministrator=false)=>{
    let databaseGrupoCentroCostos = null;
    let apiGrupoCentroCostosRaw = null;
    let apiGrupoCentroCostos = null;
    let regGrupoCentroCostos = regGrupoCentroCostosUsuario;
    if (isAdministrator) regGrupoCentroCostos = regGrupoCentroCostosAdmin;
    databaseGrupoCentroCostos = await GrupoCentroCostos.findAll(regGrupoCentroCostos);
    if (databaseGrupoCentroCostos.length===0){
        apiGrupoCentroCostosRaw = (await axios.get('http://192.168.18.15:82/grupoCentroCostos')).data;
        apiGrupoCentroCostos = await cleanArray(apiGrupoCentroCostosRaw);
        await cargaBDGrupoCentroCostos(apiGrupoCentroCostos);
        databaseGrupoCentroCostos = await GrupoCentroCostos.findAll(regGrupoCentroCostos);
    }
    return databaseGrupoCentroCostos;
};

const createGrupoCentroCostos = async (regGrupoCentroCostos)=>{
    const transactionCrearGrupoCentroCostos = await GrupoCentroCostos.sequelize.transaction();
    try {
        let maxIdGrupoCentroCostos = await GrupoCentroCostos.max('id');
        let newGrupoCentroCostos = await GrupoCentroCostos.create({id:maxIdGrupoCentroCostos+1, ...regGrupoCentroCostos},{transaction:transactionCrearGrupoCentroCostos});
        await transactionCrearGrupoCentroCostos.commit();
        console.log('Registro creado OK Tabla GrupoCentroCostos')
        return newGrupoCentroCostos;
    } catch (error) {
        await transactionCrearGrupoCentroCostos.rollback();
        console.log(error.message);
        throw new Error(error.message);
};
};

const deleteGrupoCentroCostos = async (id)=>{
    let transactionEliminarGrupoCentroCostos = await GrupoCentroCostos.sequelize.transaction();
    try {
        let foundGrupoCentroCostos = await GrupoCentroCostos.findByPk(id);
        if (!foundGrupoCentroCostos) throw new Error('ID GrupoCentroCostos no encontrado');
        let foundSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll({where:{GrupoCentroCostoId:id,borradoLogico:false}});
        if (foundSubGrupoCentroCosto.length>0) throw new Error('SubGrupoCentroCosto asociado a GrupoCentroCostos');
        let deletedGrupoCentroCostos = await foundGrupoCentroCostos.update({borradoLogico:!foundGrupoCentroCostos.borradoLogico},{transaction:transactionEliminarGrupoCentroCostos});
        await transactionEliminarGrupoCentroCostos.commit();
        console.log('Registro eliminado OK Tabla GrupoCentroCostos')
        return deletedGrupoCentroCostos;
    } catch (error) {
        await transactionEliminarGrupoCentroCostos.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllGrupoCentroCostos,createGrupoCentroCostos,deleteGrupoCentroCostos};