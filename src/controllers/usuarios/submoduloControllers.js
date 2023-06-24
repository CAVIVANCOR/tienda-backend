const {SubModulo, Modulo, Acceso} = require("../../db");
const regSubModuloUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Modulo,
        attributes:["descripcion"]
    }]
};
const {where,...regSubModuloAdmin}=regSubModuloUsuario;
const getAllSubModulos= async (isAdministrator=false)=>{
    let regSubModulo = regSubModuloUsuario;
    if (isAdministrator) regSubModulo = regSubModuloAdmin;
    let databaseSubModulos = await SubModulo.findAll(regSubModulo);
    return databaseSubModulos;
};

const createSubModulo = async (regSubModulo)=>{
    const transactionCrearSubModulo = await SubModulo.sequelize.transaction();
    try {
       // await SubModulo.sequelize.query('Lock Table SubModulo',{transaction:transactionCrearSubModulo});
        let maxIdSubModulo = await SubModulo.max('id');
        let newSubModulo = await SubModulo.create({id:maxIdSubModulo+1, ...regSubModulo},{transaction:transactionCrearSubModulo});
        await transactionCrearSubModulo.commit();
        console.log('Registro creado OK Tabla SubModulo')
        return newSubModulo;
    } catch (error) {
        await transactionCrearSubModulo.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteSubModulo = async (id)=>{
    let transactionEliminarSubModulo = await SubModulo.sequelize.transaction();
    try {
        let foundSubModulo = await SubModulo.findByPk(id);
        if (!foundSubModulo) throw new Error('ID de SubModulo no encontrado');
        let foundAcceso = await Acceso.findAll({where:{SubModuloId:id,borradoLogico:false}});
        if (foundAcceso.length>0) throw new Error('El ID de SubModulo tiene asociados Accesos, no se puede eliminar');
        let deletedSubModulo = await foundSubModulo.update({borradoLogico:!foundSubModulo.borradoLogico},{transaction:transactionEliminarSubModulo});
        await transactionEliminarSubModulo.commit();
        console.log('Registro eliminado OK Tabla SubModulo');
        return deletedSubModulo;
    } catch (error) {
        await transactionEliminarSubModulo.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateSubModulo = async (id,regSubModulo)=>{
    let transactionActualizarSubModulo = await SubModulo.sequelize.transaction();
    try {
        let foundSubModulo = await SubModulo.findByPk(id);
        if (!foundSubModulo) throw new Error('ID de SubModulo no encontrado');
        let updatedSubModulo = await foundSubModulo.update(regSubModulo,{transaction:transactionActualizarSubModulo});
        await transactionActualizarSubModulo.commit();
        console.log('Registro actualizado OK Tabla SubModulo');
        return updatedSubModulo;
    } catch (error) {
        await transactionActualizarSubModulo.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllSubModulos,createSubModulo,deleteSubModulo, updateSubModulo};