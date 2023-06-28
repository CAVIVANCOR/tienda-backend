const {SubGrupoCentroCosto, GrupoCentroCostos,CentroCosto} = require("../../db");
const axios = require("axios");
const regSubGrupoCentroCostoUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:GrupoCentroCostos,
        attributes:["descripcion", "codSunat"]
    }]
};
const {where,...regSubGrupoCentroCostoAdmin}=regSubGrupoCentroCostoUsuario;
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllSubGrupoCentroCosto= async (isAdministrator=false)=>{
    let databaseSubGrupoCentroCosto = null;
    let apiSubGrupoCentroCostoRaw = null;
    let apiSubGrupoCentroCosto = null;
    let regSubGrupoCentroCosto = regSubGrupoCentroCostoUsuario;
    if (isAdministrator) regSubGrupoCentroCosto = regSubGrupoCentroCostoAdmin;
    databaseSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll(regSubGrupoCentroCosto);
    if (databaseSubGrupoCentroCosto.length===0){
        apiSubGrupoCentroCostoRaw = (await axios.get('http://192.168.18.15:82/subGrupoCentroCostos')).data;
        apiSubGrupoCentroCosto = await cleanArray(apiSubGrupoCentroCostoRaw);
        await cargaBDSubGrupoCentroCosto(apiSubGrupoCentroCosto);
        databaseSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll(regSubGrupoCentroCosto);
    }
    return databaseSubGrupoCentroCosto;
};

const createSubGrupoCentroCosto = async (regSubGrupoCentroCosto)=>{
    const transactionCrearSubGrupoCentroCosto = await SubGrupoCentroCosto.sequelize.transaction();
    try {
       // await SubGrupoCentroCosto.sequelize.query('Lock Table SubGrupoCentroCosto',{transaction:transactionCrearSubGrupoCentroCosto});
        let maxIdSubGrupoCentroCosto = await SubGrupoCentroCosto.max('id');
        let newSubGrupoCentroCosto = await SubGrupoCentroCosto.create({id:maxIdSubGrupoCentroCosto+1, ...regSubGrupoCentroCosto},{transaction:transactionCrearSubGrupoCentroCosto});
        await transactionCrearSubGrupoCentroCosto.commit();
        console.log('Registro creado OK Tabla SubGrupoCentroCosto')
        return newSubGrupoCentroCosto;
    } catch (error) {
        await transactionCrearSubGrupoCentroCosto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteSubGrupoCentroCosto = async (id)=>{
    let transactionEliminarSubGrupoCentroCosto = await SubGrupoCentroCosto.sequelize.transaction();
    try {
        let foundSubGrupoCentroCosto = await SubGrupoCentroCosto.findByPk(id);
        if (!foundSubGrupoCentroCosto) throw new Error('ID SubGrupoCentroCosto no encontrado');
        let foundCentroCostos = await CentroCosto.findAll({where:{SubGrupoCentroCostoId:id, borradoLogico:false}});
        if (foundCentroCostos.length>0) throw new Error('SubGrupoCentroCosto tiene CentroCostos asociados');
        let deletedSubGrupoCentroCosto = await foundSubGrupoCentroCosto.update({borradoLogico:!foundSubGrupoCentroCosto.borradoLogico},{transaction:transactionEliminarSubGrupoCentroCosto});
        await transactionEliminarSubGrupoCentroCosto.commit();
        console.log('Registro eliminado OK Tabla SubGrupoCentroCosto')
        return deletedSubGrupoCentroCosto;
        } catch (error) {
        await transactionEliminarSubGrupoCentroCosto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateSubGrupoCentroCosto = async (id,regSubGrupoCentroCosto)=>{
    let transactionActualizarSubGrupoCentroCosto = await SubGrupoCentroCosto.sequelize.transaction();
    try {
        let foundSubGrupoCentroCosto = await SubGrupoCentroCosto.findByPk(id);
        if (!foundSubGrupoCentroCosto) throw new Error('ID SubGrupoCentroCosto no encontrado');
        let updatedSubGrupoCentroCosto = await foundSubGrupoCentroCosto.update(regSubGrupoCentroCosto,{transaction:transactionActualizarSubGrupoCentroCosto});
        await transactionActualizarSubGrupoCentroCosto.commit();
        console.log('Registro actualizado OK Tabla SubGrupoCentroCosto')
        return updatedSubGrupoCentroCosto;
    } catch (error) {
        await transactionActualizarSubGrupoCentroCosto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchSubGrupoCentroCosto = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundSubGrupoCentroCosto = await SubGrupoCentroCosto.findAll({
            where: {
                [Op.and]: buscar
            },
            include:[{
                model:GrupoCentroCostos,
                required:true,
            }]
        });
        console.log("searchSubGrupoCentroCosto:Registros encontrados en Tabla SubGrupoCentroCosto",foundSubGrupoCentroCosto, foundSubGrupoCentroCosto.length);
        return foundSubGrupoCentroCosto;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllSubGrupoCentroCosto,createSubGrupoCentroCosto,deleteSubGrupoCentroCosto, updateSubGrupoCentroCosto, searchSubGrupoCentroCosto};