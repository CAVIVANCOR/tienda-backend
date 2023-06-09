const {Rol} = require("../../db");

const getAllRoles= async ()=>{
    let databaseRoles = await Rol.findAll();
    return databaseRoles;
};

const createRol = async (regRol)=>{
    const transactionCrearRol = await Rol.sequelize.transaction();
    try {
        //await Rol.sequelize.query('Lock Table Rol',{transaction:transactionCrearRol});
        let maxIdRol = await Rol.max('id',{transaction:transactionCrearRol});
        let newRol = await Rol.create({id:maxIdRol+1, ...regRol},{transaction:transactionCrearRol});
        await transactionCrearRol.commit();
        console.log('Registro creado OK Tabla Rol')
        return newRol;
    } catch (error) {
        await transactionCrearRol.rollback();
        console.log(error.message);
    };
}
module.exports = {getAllRoles,createRol};