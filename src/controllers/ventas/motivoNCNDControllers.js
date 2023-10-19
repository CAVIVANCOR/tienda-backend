const { Op } = require("sequelize");
const {MotivoNCND, CabVentas} = require("../../db");
const axios = require("axios");
const regMotivoNCNDUsuario ={
    where: { borradoLogico: false },
};
const {where,...regMotivoNCNDAdmin}=regMotivoNCNDUsuario;
const cleanArray= (arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            tipoNCND:elem.tipoNCND,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDMotivoNCND = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await MotivoNCND.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllMotivoNCND= async (isAdministrator=false)=>{
    let databaseMotivoNCND = null;
    let apiMotivoNCNDRaw = null;
    let apiMotivoNCND = null;
    let regMotivoNCND = regMotivoNCNDUsuario;
    if (isAdministrator) regMotivoNCND = regMotivoNCNDAdmin;
    databaseMotivoNCND = await MotivoNCND.findAll(regMotivoNCND);
    if (databaseMotivoNCND.length===0){
        apiMotivoNCNDRaw = (await axios.get('http://192.168.18.15:82/MotivoNCND')).data;
        apiMotivoNCND = cleanArray(apiMotivoNCNDRaw);
        await cargaBDMotivoNCND(apiMotivoNCND);
        databaseMotivoNCND = await MotivoNCND.findAll(regMotivoNCND);
    }
    return databaseMotivoNCND;
};

const createMotivoNCND = async (regMotivoNCND)=>{
    const transactionCrearMotivoNCND = await MotivoNCND.sequelize.transaction();
    try {
        let maxIdMotivoNCND = await MotivoNCND.max('id');
        let newMotivoNCND = await MotivoNCND.create({id:maxIdMotivoNCND+1, ...regMotivoNCND},{transaction:transactionCrearMotivoNCND});
        await transactionCrearMotivoNCND.commit();
        console.log('Registro creado OK Tabla MotivoNCND')
        return newMotivoNCND;
    } catch (error) {
        await transactionCrearMotivoNCND.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteMotivoNCND = async (id)=>{
    let transactionEliminarMotivoNCND = await MotivoNCND.sequelize.transaction();
    try {
        let foundMotivoNCND = await MotivoNCND.findByPk(id);
        if (!foundMotivoNCND) throw new Error('No se encontró el ID MotivoNCND');
        let foundCabCompras = await CabCompras.findAll({where:{MotivoNCNDId:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{MotivoNCNDId:id,borradoLogico:false}});
        if (foundCabCompras.length>0) throw new Error('No se puede borrar el MotivoNCND porque tiene Compras asociadas');
        if (foundCabVentas.length>0) throw new Error('No se puede borrar el MotivoNCND porque tiene Ventas asociadas');
        let deletedMotivoNCND = await foundMotivoNCND.update({borradoLogico:!foundMotivoNCND.borradoLogico},{transaction:transactionEliminarMotivoNCND});
        await transactionEliminarMotivoNCND.commit();
        console.log('Registro eliminado OK Tabla MotivoNCND');
        return deletedMotivoNCND;
    } catch (error) {
        await transactionEliminarMotivoNCND.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateMotivoNCND = async (id,regMotivoNCND)=>{
    let transactionActualizarMotivoNCND = await MotivoNCND.sequelize.transaction();
    try {
        let foundMotivoNCND = await MotivoNCND.findByPk(id);
        if (!foundMotivoNCND) throw new Error('No se encontró el ID MotivoNCND');
        let updatedMotivoNCND = await foundMotivoNCND.update(regMotivoNCND,{transaction:transactionActualizarMotivoNCND});
        await transactionActualizarMotivoNCND.commit();
        console.log('Registro actualizado OK Tabla MotivoNCND');
        return updatedMotivoNCND;
    } catch (error) {
        await transactionActualizarMotivoNCND.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchMotivoNCND = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundMotivoNCND = await MotivoNCND.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchMotivoNCND:Registros encontrados en Tabla MotivoNCND",foundMotivoNCND, foundMotivoNCND.length);
        return foundMotivoNCND;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllMotivoNCND,createMotivoNCND,deleteMotivoNCND, updateMotivoNCND, searchMotivoNCND};