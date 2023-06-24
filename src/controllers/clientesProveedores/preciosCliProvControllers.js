const {PreciosCliProv,DetCompras,DetVentas} = require("../../db");
const regPreciosCliProvUsuario ={
    where: { borradoLogico: false },
};
const {where,...regPreciosCliProvAdmin}=regPreciosCliProvUsuario;
const getAllPreciosCliProv= async (isAdministrator=false)=>{
    let regPreciosCliProv = regPreciosCliProvUsuario;
    if (isAdministrator) regPreciosCliProv = regPreciosCliProvAdmin;
    let databasePreciosCliProv = await PreciosCliProv.findAll(regPreciosCliProv);
    return databasePreciosCliProv;
};

const createPreciosCliProv = async (regPreciosCliProv)=>{
    const transactionCrearPreciosCliProv = await PreciosCliProv.sequelize.transaction();
    try {
        //await PreciosCliProv.sequelize.query('Lock Table PreciosCliProv',{transaction:transactionCrearPreciosCliProv});
        let maxIdPreciosCliProv = await PreciosCliProv.max("id");
        let newPreciosCliProv = await PreciosCliProv.create({id:maxIdPreciosCliProv+1, ...regPreciosCliProv},{transaction:transactionCrearPreciosCliProv});
        await transactionCrearPreciosCliProv.commit();
        console.log('Registro creado OK Tabla PreciosCliProv')
        return newPreciosCliProv;
    } catch (error) {
        await transactionCrearPreciosCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deletePreciosCliProv = async (id)=>{
    const transactionEliminarPreciosCliProv = await PreciosCliProv.sequelize.transaction();
    try {
        let foundPreciosCliProv = await PreciosCliProv.findByPk(id);
        if (!foundPreciosCliProv) throw new Error('ID PreciosCliProv no encontrado');
        let foundDetCompras = await DetCompras.findAll({ where: { PreciosCliProvId: id, borradoLogico: false } });
        let foundDetVentas = await DetVentas.findAll({ where: { PreciosCliProvId: id, borradoLogico: false } });
        if (foundDetCompras.length>0) throw new Error('ID de PreciosCliProv tiene Movimientos en DetCompras, no se puede eliminar');
        if (foundDetVentas.length>0) throw new Error('ID de PreciosCliProv tiene Movimientos en DetVentas, no se puede eliminar');
        let deletedPreciosCliProv = await foundPreciosCliProv.update({borradoLogico:!foundPreciosCliProv.borradoLogico},{transaction:transactionEliminarPreciosCliProv});
        await transactionEliminarPreciosCliProv.commit();
        console.log('Registro borrado OK Tabla PreciosCliProv')
        return deletedPreciosCliProv;
    } catch (error) {
        await transactionEliminarPreciosCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updatePreciosCliProv = async (id,regPreciosCliProv)=>{
    const transactionActualizarPreciosCliProv = await PreciosCliProv.sequelize.transaction();
    try {
        let foundPreciosCliProv = await PreciosCliProv.findByPk(id);
        if (!foundPreciosCliProv) throw new Error('ID PreciosCliProv no encontrado');
        let updatedPreciosCliProv = await foundPreciosCliProv.update(regPreciosCliProv,{transaction:transactionActualizarPreciosCliProv});
        await transactionActualizarPreciosCliProv.commit();
        console.log('Registro actualizado OK Tabla PreciosCliProv')
        return updatedPreciosCliProv;
    } catch (error) {
        await transactionActualizarPreciosCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllPreciosCliProv, createPreciosCliProv, deletePreciosCliProv, updatePreciosCliProv};
