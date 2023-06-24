const {Rol,Usuario} = require("../../db");
const regRolUsuario ={
    where: { borradoLogico: false },
};
const {where,...regRolAdmin}=regRolUsuario;
const getAllRoles= async (isAdministrator=false)=>{
    let regRol = regRolUsuario;
    if (isAdministrator) regRol = regRolAdmin;
    let databaseRoles = await Rol.findAll();
    return databaseRoles;
};

const createRol = async (regRol)=>{
    const transactionCrearRol = await Rol.sequelize.transaction();
    try {
        //await Rol.sequelize.query('Lock Table Rol',{transaction:transactionCrearRol});
        let maxIdRol = await Rol.max('id');
        let newRol = await Rol.create({id:maxIdRol+1, ...regRol},{transaction:transactionCrearRol});
        await transactionCrearRol.commit();
        console.log('Registro creado OK Tabla Rol')
        return newRol;
    } catch (error) {
        await transactionCrearRol.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteRol = async (id)=>{
    let transactionEliminarRol = await Rol.sequelize.transaction();
    try {
        let foundRol = await Rol.findByPk(id);
        if (!foundRol) throw new Error('ID de Rol no encontrado');
        let foundUsuario = await Usuario.findAll({where:{RolId:id}});
        if (foundUsuario.length>0) throw new Error('Rol tiene usuarios asociados');
        let deletedRol = await foundRol.update({borradoLogico:!foundRol.borradoLogico},{transaction:transactionEliminarRol});
        await transactionEliminarRol.commit();
        console.log('Registro eliminado OK Tabla Rol');
        return deletedRol;
    } catch (error) {
        await transactionEliminarRol.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateRol = async (id,regRol)=>{
    let transactionActualizarRol = await Rol.sequelize.transaction();
    try {
        let foundRol = await Rol.findByPk(id);
        if (!foundRol) throw new Error('ID de Rol no encontrado');
        let updatedRol = await foundRol.update(regRol,{transaction:transactionActualizarRol});
        await transactionActualizarRol.commit();
        console.log('Registro actualizado OK Tabla Rol');
        return updatedRol;
    } catch (error) {
        await transactionActualizarRol.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllRoles,createRol,deleteRol, updateRol};