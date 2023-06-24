const {TransportistaCliProv,CabMovAlmacen} = require("../../db");
const regTransportistaCliProvUsuario ={
    where: { borradoLogico: false },
};
const {where,...regTransportistaCliProvAdmin}=regTransportistaCliProvUsuario;
const getAllTransportistaCliProv= async (isAdministrator=false)=>{
    let regTransportistaCliProv = regTransportistaCliProvUsuario;
    if (isAdministrator) regTransportistaCliProv = regTransportistaCliProvAdmin;
    let databaseTransportistaCliProv = await TransportistaCliProv.findAll(regTransportistaCliProv);
    return databaseTransportistaCliProv;
};

const createTransportistaCliProv = async (regTransportistaCliProv)=>{
    const transactionCrearTransportistaCliProv = await TransportistaCliProv.sequelize.transaction();
    try {
        //await TransportistaCliProv.sequelize.query('Lock Table TransportistaCliProv',{transaction:transactionCrearTransportistaCliProv});
        let maxIdTransportistaCliProv = await TransportistaCliProv.max("id");
        let newTransportistaCliProv = await TransportistaCliProv.create({id:maxIdTransportistaCliProv+1, ...regTransportistaCliProv},{transaction:transactionCrearTransportistaCliProv});
        await transactionCrearTransportistaCliProv.commit();
        console.log('Registro creado OK Tabla TransportistaCliProv')
        return newTransportistaCliProv;
    } catch (error) {
        await transactionCrearTransportistaCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteTransportistaCliProv = async (id)=>{
    const transactionEliminarTransportistaCliProv = await TransportistaCliProv.sequelize.transaction();
    try {
        let foundtransportistaCliProv = await TransportistaCliProv.findByPk(id);
        if (!foundtransportistaCliProv) throw new Error('ID de TransportistaCliProv no encontrado');
        let foundCabMovAlmacen = await CabMovAlmacen.findAll({where:{idTransportista:id,borradoLogico:false}});
        if (foundCabMovAlmacen.length>0) throw new Error('El TransportistaCliProv tiene movimientos de Almacen asociados');
        let deletedTransportistaCliProv = await foundtransportistaCliProv.update({borradoLogico:!foundtransportistaCliProv.borradoLogico},{transaction:transactionEliminarTransportistaCliProv});
        await transactionEliminarTransportistaCliProv.commit();
        console.log('Registro eliminado OK Tabla TransportistaCliProv');
        return deletedTransportistaCliProv;
    } catch (error) {
        await transactionEliminarTransportistaCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateTransportistaCliProv = async (id,regTransportistaCliProv)=>{
    const transactionActualizarTransportistaCliProv = await TransportistaCliProv.sequelize.transaction();
    try {
        let foundtransportistaCliProv = await TransportistaCliProv.findByPk(id);
        if (!foundtransportistaCliProv) throw new Error('ID de TransportistaCliProv no encontrado');
        let updatedTransportistaCliProv = await foundtransportistaCliProv.update(regTransportistaCliProv,{transaction:transactionActualizarTransportistaCliProv});
        await transactionActualizarTransportistaCliProv.commit();
        console.log('Registro actualizado OK Tabla TransportistaCliProv');
        return updatedTransportistaCliProv;
    } catch (error) {
        await transactionActualizarTransportistaCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllTransportistaCliProv,createTransportistaCliProv,deleteTransportistaCliProv, updateTransportistaCliProv};