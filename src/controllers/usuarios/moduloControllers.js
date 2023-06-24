const {Modulo,SubModulo} = require("../../db");
const regModuloUsuario ={
    where: { borradoLogico: false },
};
const {where,...regModuloAdmin}=regModuloUsuario;
const getAllModulos= async (isAdministrator=false)=>{
    let regModulo = regModuloUsuario;
    if (isAdministrator) regModulo = regModuloAdmin;
    let databaseModulos = await Modulo.findAll(regModulo);
    return databaseModulos;
};

const createModulo = async (regModulo)=>{
    const transactionCrearModulo = await Modulo.sequelize.transaction();
    try {
       // await Modulo.sequelize.query('Lock Table Modulo',{transaction:transactionCrearModulo});
        let maxIdModulo = await Modulo.max('id');
        let newModulo = await Modulo.create({id:maxIdModulo+1, ...regModulo},{transaction:transactionCrearModulo});
        await transactionCrearModulo.commit();
        console.log('Registro creado OK Tabla Modulo')
        return newModulo;
    } catch (error) {
        await transactionCrearModulo.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

const deleteModulo = async (id)=>{
    let transactionEliminarModulo = await Modulo.sequelize.transaction();
    try {
        let foundModulo = await Modulo.findByPk(id);
        if (!foundModulo) throw new Error('ID de Modulo no encontrado');
        let foundSubModulo = await SubModulo.findAll({where:{ModuloId:id,borradoLogico:false}});
        if (foundSubModulo.length>0) throw new Error('Modulo tiene SubModulos asociados'); 
        let deletedModulo = await foundModulo.update({borradoLogico:!foundModulo.borradoLogico},{transaction:transactionEliminarModulo});
        await transactionEliminarModulo.commit();
        console.log('Registro eliminado OK Tabla Modulo');
        return deletedModulo;
    } catch (error) {
        await transactionEliminarModulo.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateModulo = async (id,regModulo)=>{
    let transactionActualizarModulo = await Modulo.sequelize.transaction();
    try {
        let foundModulo = await Modulo.findByPk(id);
        if (!foundModulo) throw new Error('ID de Modulo no encontrado');
        let updatedModulo = await foundModulo.update(regModulo,{transaction:transactionActualizarModulo});
        await transactionActualizarModulo.commit();
        console.log('Registro actualizado OK Tabla Modulo');
        return updatedModulo;
    } catch (error) {
        await transactionActualizarModulo.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllModulos,createModulo,deleteModulo, updateModulo};