const {PreciosCliProv} = require("../../db");

const getAllPreciosCliProv= async ()=>{
    let databasePreciosCliProv = await PreciosCliProv.findAll();
    return databasePreciosCliProv;
};

const createPreciosCliProv = async (regPreciosCliProv)=>{
    const transactionCrearPreciosCliProv = await PreciosCliProv.sequelize.transaction();
    try {
        //await PreciosCliProv.sequelize.query('Lock Table PreciosCliProv',{transaction:transactionCrearPreciosCliProv});
        let maxIdPreciosCliProv = await PreciosCliProv.max("id", {transaction:transactionCrearPreciosCliProv});
        let newPreciosCliProv = await PreciosCliProv.create({id:maxIdPreciosCliProv+1, ...regPreciosCliProv},{transaction:transactionCrearPreciosCliProv});
        await transactionCrearPreciosCliProv.commit();
        console.log('Registro creado OK Tabla PreciosCliProv')
        return newPreciosCliProv;
    } catch (error) {
        await transactionCrearPreciosCliProv.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllPreciosCliProv, createPreciosCliProv};