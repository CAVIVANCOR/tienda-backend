const {Almacen,Distrito, ConceptoAlmacen} = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { managerCRUDError } = require("../../utils/errors");
const regAlmacenUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Distrito,
        attributes:["descripcion","codSunat"]
    }]
};
const {where,...regAlmacenAdmin}=regAlmacenUsuario;

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            kardex:elem.kardex,
            direccion:elem.direccion,
            DistritoId:elem.DistritoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Almacen.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllAlmacen= async (isAdministrator=false)=>{
    let databaseAlmacen = null;
    let apiAlmacenRaw = null;
    let apiAlmacen = null;
    let regAlmacen = regAlmacenUsuario;
    if (isAdministrator) regAlmacen = regAlmacenAdmin;
    databaseAlmacen = await Almacen.findAll(regAlmacen);
    if (databaseAlmacen.length===0){
        apiAlmacenRaw = (await axios.get('http://192.168.18.15:82/almacenes')).data;
        apiAlmacen = await cleanArray(apiAlmacenRaw);
        await cargaBDAlmacen(apiAlmacen);
        databaseAlmacen = await Almacen.findAll(regAlmacen);
        await Almacen.sequelize.query('SELECT setval(\'"Almacen_id_seq"\', (SELECT MAX(id) FROM "Almacen"))');
    }
    return databaseAlmacen;
};

const createAlmacen = async (regAlmacen)=>{
    const transactionCrearAlmacen = await Almacen.sequelize.transaction();
    try {
        await Almacen.sequelize.query('SELECT setval(\'"Almacen_id_seq"\', (SELECT MAX(id) FROM "Almacen"))');
        let newAlmacen = await Almacen.create(regAlmacen,{transaction:transactionCrearAlmacen});
        await transactionCrearAlmacen.commit();
        console.log('Registro creado OK Tabla Almacen')
        return newAlmacen;
    } catch (error) {
        await transactionCrearAlmacen.rollback();
        console.log(error.message);
        throw new managerCRUDError(error.message,500,'Almacen');
    };
};

const deleteAlmacen = async (id, isAdministrator=false) => {
    let transactionEliminarAlmacen = await Almacen.sequelize.transaction();
    try {
        const foundAlmacen = await Almacen.findByPk(id);
        if (!foundAlmacen) throw new Error('Delete: No se encontro ningun Registro');
        let foundConceptoAlmacen = await ConceptoAlmacen.findAll({
            where: {
                [Op.or]: [
                    { codAlmacenOrigen: id },
                    { codAlmacenDestino: id }
                ],
                borradoLogico: false}
            }
        );
        if (foundConceptoAlmacen.length>0) throw new Error('Delete: No se puede marcar como borrado porque en ConceptoAlmacen lo referencian');
        let deletedAlmacen=null;
        if (isAdministrator){
            deletedAlmacen = await foundAlmacen.destroy({ where: { id }, transaction: transactionEliminarAlmacen });
        }else{
            deletedAlmacen = await foundAlmacen.update({borradoLogico:!foundAlmacen.borradoLogico},{transaction:transactionEliminarAlmacen});
        }
        console.log("Registro eliminado OK Tabla Almacen", foundAlmacen.dataValues);
        await transactionEliminarAlmacen.commit();
        return foundAlmacen;
    } catch (error) {
        await transactionEliminarAlmacen.rollback();
        console.error(error);
        throw new managerCRUDError(error.message,500,'Almacen');
    }
};

const updateAlmacen = async (id,regAlmacen)=>{
    let transactionActualizarAlmacen = await Almacen.sequelize.transaction();
    try {
        const foundAlmacen = await Almacen.findByPk(id);
        if (!foundAlmacen) throw new Error('Update: No se ha encontrado el registro');
        let updatedAlmacen = await foundAlmacen.update(regAlmacen,{transaction:transactionActualizarAlmacen});
        await transactionActualizarAlmacen.commit();
        console.log("Update:Registro actualizado OK Tabla Almacen",updatedAlmacen.dataValues );
        return updatedAlmacen;
    } catch (error) {
        await transactionActualizarAlmacen.rollback();
        console.error(error);
        throw new managerCRUDError(error.message,500,'Almacen');
    }
};

const searchByAlmacen = async (search) => {
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsAlmacen = await Almacen.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("Search: Registros encontrados en Tabla Almacen",foundRegsAlmacen, foundRegsAlmacen.length);
        if (foundRegsAlmacen.length===0) throw new Error('Search: No se encontraron registros');
        return foundRegsAlmacen;
    } catch (error) {
        console.log(error.message);
        throw new managerCRUDError(error.message,500,'Almacen');
    }

};


module.exports = {getAllAlmacen, createAlmacen, deleteAlmacen, updateAlmacen, searchByAlmacen};