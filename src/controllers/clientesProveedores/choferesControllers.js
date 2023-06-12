const {Chofer, TipoDocIdentidad,CabMovAlmacen} = require("../../db");
const regChoferesUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:TipoDocIdentidad,
        attributes:["descripcion","codSunat"]
    }]
};
const {where,...regChoferesAdmin}=regChoferesUsuario;
const getAllChofer = async (isAdministrator=false)=>{
    let regChoferes = regChoferesUsuario;
    if (isAdministrator) regChoferes = regChoferesAdmin;
    let databaseChofer = await Chofer.findAll(regChoferes);
    return databaseChofer;
};

const createChofer = async (regChofer)=>{
    const transactionCrearChofer = await Chofer.sequelize.transaction();
    try {
       //await Chofer.sequelize.query('Lock Table Chofer',{transaction:transactionCrearChofer});
        let maxIdChofer = await Chofer.max('id');
        let newChofer = await Chofer.create({id:maxIdChofer+1, ...regChofer},{transaction:transactionCrearChofer});
        await transactionCrearChofer.commit();
        console.log('Registro creado OK Tabla Chofer')
        return newChofer;
    } catch (error) {
        await transactionCrearChofer.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteChofer = async (id)=>{
    const transactionEliminarChofer = await Chofer.sequelize.transaction();
    try {
        let foundChofer = await Chofer.findByPk(id);
        if (!foundChofer) throw new Error("El ID del Registro de la Tabla Choferes No encontrado");
        let foundCabMovalmacen = await CabMovAlmacen.findAll({where:{idChofer:id, borradoLogico:false}});
        if (foundCabMovalmacen.length>0) throw new Error("El Chofer No puede ser eliminado,posee movimientos en Almacen"); 
        let deletedChofer = await foundChofer.update({borradoLogico:!foundChofer.borradoLogico},{transaction:transactionEliminarChofer});
        await transactionEliminarChofer.commit();
        console.log('Registro borrado OK Tabla Chofer')
        return deletedChofer;
    } catch (error) {
        await transactionEliminarChofer.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllChofer, createChofer, deleteChofer};