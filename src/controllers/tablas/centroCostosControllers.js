const {CentroCosto, SubGrupoCentroCosto, GrupoCentroCostos} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            tipoIngEgr:elem.tipoIngEgr,
            calcUtilidades:elem.calcUtilidades,
            SubGrupoCentroCostoId:elem.SubGrupoCentroCostoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCentroCosto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await CentroCosto.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllCentroCosto= async ()=>{
    let databaseCentroCosto = null;
    let apiCentroCostoRaw = null;
    let apiCentroCosto = null;
    databaseCentroCosto = await CentroCosto.findAll({
        include:[{
            model:SubGrupoCentroCosto,
            attributes:["descripcion", "codSunat"],
            include:[{
                model:GrupoCentroCostos,
                attributes: ["descripcion", "codSunat"]
            }]
        }]
    });
    if (databaseCentroCosto.length===0){
        apiCentroCostoRaw = (await axios.get('http://192.168.18.15:82/centroCostos')).data;
        apiCentroCosto = await cleanArray(apiCentroCostoRaw);
        await cargaBDCentroCosto(apiCentroCosto);
        databaseCentroCosto = await CentroCosto.findAll({
            include:[{
                model:SubGrupoCentroCosto,
                attributes:["descripcion", "codSunat"],
                include:[{
                    model:GrupoCentroCostos,
                    attributes: ["descripcion", "codSunat"]
                }]
            }]
        });
    }
    return databaseCentroCosto;
};

const createCentroCosto = async (regCentroCosto)=>{
    const transactionCrearCentroCosto = await CentroCosto.sequelize.transaction();
    try {
        //await CentroCosto.sequelize.query('Lock Table CentroCosto',{transaction:transactionCrearCentroCosto});
        let maxIdCentroCosto = await CentroCosto.max('id',{transaction:transactionCrearCentroCosto});
        let newCentroCosto = await CentroCosto.create({id:maxIdCentroCosto+1, ...regCentroCosto},{transaction:transactionCrearCentroCosto});
        await transactionCrearCentroCosto.commit();
        console.log('Registro creado OK Tabla CentroCosto')
        return newCentroCosto;
    } catch (error) {
        await transactionCrearCentroCosto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllCentroCosto,createCentroCosto};