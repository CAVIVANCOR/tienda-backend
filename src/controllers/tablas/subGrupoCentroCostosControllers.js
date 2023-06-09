const {SubGrupoCentroCosto, GrupoCentroCostos} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            GrupoCentroCostoId:elem.GrupoCentroCostoId,
            codSunat:elem.codSunat,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDSubGrupoCentroCosto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await SubGrupoCentroCosto.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllSubGrupoCentroCosto= async ()=>{
    let databaseSubGrupoCentroCosto = null;
    let apiSubGrupoCentroCostoRaw = null;
    let apiSubGrupoCentroCosto = null;
    databaseSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll({
        include:[{
            model:GrupoCentroCostos,
            attributes:["descripcion", "codSunat"]
        }]
    });
    if (databaseSubGrupoCentroCosto.length===0){
        apiSubGrupoCentroCostoRaw = (await axios.get('http://192.168.18.15:82/subGrupoCentroCostos')).data;
        apiSubGrupoCentroCosto = await cleanArray(apiSubGrupoCentroCostoRaw);
        await cargaBDSubGrupoCentroCosto(apiSubGrupoCentroCosto);
        databaseSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll({
            include:[{
                model:GrupoCentroCostos,
                attributes:["descripcion", "codSunat"]
            }]
        });
    }
    return databaseSubGrupoCentroCosto;
};

const createSubGrupoCentroCosto = async (regSubGrupoCentroCosto)=>{
    const transactionCrearSubGrupoCentroCosto = await SubGrupoCentroCosto.sequelize.transaction();
    try {
       // await SubGrupoCentroCosto.sequelize.query('Lock Table SubGrupoCentroCosto',{transaction:transactionCrearSubGrupoCentroCosto});
        let maxIdSubGrupoCentroCosto = await SubGrupoCentroCosto.max('id',{transaction:transactionCrearSubGrupoCentroCosto});
        let newSubGrupoCentroCosto = await SubGrupoCentroCosto.create({id:maxIdSubGrupoCentroCosto+1, ...regSubGrupoCentroCosto},{transaction:transactionCrearSubGrupoCentroCosto});
        await transactionCrearSubGrupoCentroCosto.commit();
        console.log('Registro creado OK Tabla SubGrupoCentroCosto')
        return newSubGrupoCentroCosto;
    } catch (error) {
        await transactionCrearSubGrupoCentroCosto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllSubGrupoCentroCosto,createSubGrupoCentroCosto};