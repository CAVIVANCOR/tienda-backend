const { Op } = require("sequelize");
const {DatoGlobal,sequelize} = require("../../db");
const regDatoGlobalUsuario ={
    where: { borradoLogico: false },
};
const {where,...regDatoGlobalAdmin}=regDatoGlobalUsuario;
const getAllDatosGlobales= async (isAdministrator=false)=>{
    let regDatoGlobal = regDatoGlobalUsuario;
    if (isAdministrator) regDatoGlobal = regDatoGlobalAdmin;
    let databaseDatosGlobales = await DatoGlobal.findAll(regDatoGlobal);
    return databaseDatosGlobales;
};

const createDatosGlobales = async (regDatosGlobales)=>{
    const transactionCrearDatosGlobales = await sequelize.transaction();
    try {
        let countDatosGlobales = await DatoGlobal.count({transaction:transactionCrearDatosGlobales});
        let maxIdDatosGlobales = countDatosGlobales > 0 ? await DatoGlobal.max('id') : 0;
        let newDatosGlobales = await DatoGlobal.create({id:maxIdDatosGlobales+1, ...regDatosGlobales},{transaction:transactionCrearDatosGlobales});
        await transactionCrearDatosGlobales.commit();
        console.log('Registro creado OK Tabla DatoGlobal')
        return newDatosGlobales;
    } catch (error) {
        await transactionCrearDatosGlobales.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteDatosGlobales = async (id)=>{
    let transactionEliminarDatosGlobales = await DatoGlobal.sequelize.transaction();
    try {
        let foundDatosGlobales = await DatoGlobal.findByPk(id);
        if (!foundDatosGlobales) throw new Error('ID DatoGlobal no encontrado');
        let deletedDatosGlobales = await foundDatosGlobales.destroy({transaction:transactionEliminarDatosGlobales});
        await transactionEliminarDatosGlobales.commit();
        console.log('Registro eliminado OK Tabla DatoGlobal')
        return deletedDatosGlobales;
    } catch (error) {
        await transactionEliminarDatosGlobales.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateDatosGlobales = async (id,regDatosGlobales)=>{
    let transactionActualizarDatosGlobales = await DatoGlobal.sequelize.transaction();
    try {
        let foundDatosGlobales = await DatoGlobal.findByPk(id);
        if (!foundDatosGlobales) throw new Error('ID DatoGlobal no encontrado');
        let updatedDatosGlobales = await foundDatosGlobales.update(regDatosGlobales,{transaction:transactionActualizarDatosGlobales});
        await transactionActualizarDatosGlobales.commit();
        console.log('Registro actualizado OK Tabla DatoGlobal')
        return updatedDatosGlobales;
    } catch (error) {
        await transactionActualizarDatosGlobales.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchDatoGlobal = async (search)=>{
    try {
        console.log("search",search);
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundDatoGlobal = await DatoGlobal.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchDatoGlobal:Registros encontrados en Tabla DatoGlobal",foundDatoGlobal, foundDatoGlobal.length);
        return foundDatoGlobal;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllDatosGlobales,createDatosGlobales, deleteDatosGlobales, updateDatosGlobales, searchDatoGlobal};