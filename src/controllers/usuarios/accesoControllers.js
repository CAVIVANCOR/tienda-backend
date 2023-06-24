const {Acceso, Modulo, SubModulo} = require("../../db");
const regAccesoUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:SubModulo,
        attributes:["descripcion"],
        include:[{
            model:Modulo,
            attributes:["descripcion"]
        }]
    }]
};
const {where,...regAccesoAdmin}=regAccesoUsuario;
const getAllAccesos= async (isAdministrator=false)=>{
    let regAcceso = regAccesoUsuario;
    if (isAdministrator) regAcceso = regAccesoAdmin;
    let databaseAccesos = await Acceso.findAll(regAcceso);
    return databaseAccesos;
};

const createAccesos = async (regAccesos)=>{
    const transactionCrearAcceso = await Acceso.sequelize.transaction();
    try {
        //await Acceso.sequelize.query('Lock Table Acceso',{transaction:transactionCrearAcceso});
        let maxIdAcceso = await Acceso.max('id');
        let newAcceso = await Acceso.create({id:maxIdAcceso+1, ...regAccesos},{transaction:transactionCrearAcceso});
        await transactionCrearAcceso.commit();
        console.log('Registro creado OK Tabla Acceso')
        return newAcceso;
    } catch (error) {
        await transactionCrearAcceso.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteAcceso = async (id)=>{
    let transactionEliminarAcceso = await Acceso.sequelize.transaction();
    try {
        let foundAcceso = await Acceso.findByPk(id);
        if (!foundAcceso) throw new Error('ID de Acceso no encontrado');
        let deletedAcceso = await foundAcceso.update({borradoLogico:!foundAcceso.borradoLogico},{transaction:transactionEliminarAcceso});
        await transactionEliminarAcceso.commit();
        console.log('Registro eliminado OK Tabla Acceso');
        return deletedAcceso;
    } catch (error) {
        await transactionEliminarAcceso.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateAcceso = async (id,regAcceso)=>{
    let transactionActualizarAcceso = await Acceso.sequelize.transaction();
    try {
        let foundAcceso = await Acceso.findByPk(id);
        if (!foundAcceso) throw new Error('ID de Acceso no encontrado');
        let updatedAcceso = await foundAcceso.update(regAcceso,{transaction:transactionActualizarAcceso});
        await transactionActualizarAcceso.commit();
        console.log('Registro actualizado OK Tabla Acceso');
        return updatedAcceso;
    } catch (error) {
        await transactionActualizarAcceso.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllAccesos,createAccesos,deleteAcceso, updateAcceso};
