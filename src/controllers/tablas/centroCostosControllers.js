const {CentroCosto, SubGrupoCentroCosto, GrupoCentroCostos, CabVentas,CabCompras,CabMovAlmacen} = require("../../db");
const axios = require("axios");
const regCentroCostoUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:SubGrupoCentroCosto,
        attributes:["descripcion", "codSunat"],
        include:[{
            model:GrupoCentroCostos,
            attributes: ["descripcion", "codSunat"]
        }]
    }]
};
const {where,...regCentroCostoAdmin}=regCentroCostoUsuario;
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllCentroCosto= async (isAdministrator=false)=>{
    let databaseCentroCosto = null;
    let apiCentroCostoRaw = null;
    let apiCentroCosto = null;
    let regCentroCosto = regCentroCostoUsuario;
    if (isAdministrator) regCentroCosto = regCentroCostoAdmin;
    databaseCentroCosto = await CentroCosto.findAll(regCentroCosto);
    if (databaseCentroCosto.length===0){
        apiCentroCostoRaw = (await axios.get('http://192.168.18.15:82/centroCostos')).data;
        apiCentroCosto = await cleanArray(apiCentroCostoRaw);
        await cargaBDCentroCosto(apiCentroCosto);
        databaseCentroCosto = await CentroCosto.findAll(regCentroCosto);
    }
    return databaseCentroCosto;
};

const createCentroCosto = async (regCentroCosto)=>{
    const transactionCrearCentroCosto = await CentroCosto.sequelize.transaction();
    try {
        //await CentroCosto.sequelize.query('Lock Table CentroCosto',{transaction:transactionCrearCentroCosto});
        let maxIdCentroCosto = await CentroCosto.max('id');
        let newCentroCosto = await CentroCosto.create({id:maxIdCentroCosto+1, ...regCentroCosto},{transaction:transactionCrearCentroCosto});
        await transactionCrearCentroCosto.commit();
        console.log('Registro creado OK Tabla CentroCosto')
        return newCentroCosto;
    } catch (error) {
        await transactionCrearCentroCosto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteCentroCosto = async (id)=>{
    let transactionEliminarCentroCosto = await CentroCosto.sequelize.transaction();
    try {
        let foundCentroCosto = await CentroCosto.findByPk(id);
        if (!foundCentroCosto) throw new Error('ID CentroCosto no encontrado');
        let foundCabVentas = await CabVentas.findAll({where:{CentroCostoId:id, borradoLogico:false}});
        let foundCabCompras = await CabCompras.findAll({where:{CentroCostoId:id, borradoLogico:false}});
        let foundCabMovAlmacen = await CabMovAlmacen.findAll({where:{CentroCostoId:id, borradoLogico:false}});
        if (foundCabVentas.length>0) throw new Error('No se puede eliminar el CentroCosto porque tiene cabVentas asociadas');
        if (foundCabCompras.length>0) throw new Error('No se puede eliminar el CentroCosto porque tiene cabCompras asociadas');
        if (foundCabMovAlmacen.length>0) throw new Error('No se puede eliminar el CentroCosto porque tiene cabMovAlmacen asociadas');
        let deletedCentroCosto = await foundCentroCosto.update({borradoLogico:!foundCentroCosto.borradoLogico},{transaction:transactionEliminarCentroCosto});
        await transactionEliminarCentroCosto.commit();
        console.log('Registro eliminado OK Tabla CentroCosto');
        return deletedCentroCosto;
    } catch (error) {
        await transactionEliminarCentroCosto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllCentroCosto,createCentroCosto, deleteCentroCosto};