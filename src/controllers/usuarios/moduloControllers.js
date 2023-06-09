const {Modulo} = require("../../db");

const getAllModulos= async ()=>{
    let databaseModulos = await Modulo.findAll();
    return databaseModulos;
};

const createModulo = async (regModulo)=>{
    const transactionCrearModulo = await Modulo.sequelize.transaction();
    try {
       // await Modulo.sequelize.query('Lock Table Modulo',{transaction:transactionCrearModulo});
        let maxIdModulo = await Modulo.max('id',{transaction:transactionCrearModulo});
        let newModulo = await Modulo.create({id:maxIdModulo+1, ...regModulo},{transaction:transactionCrearModulo});
        await transactionCrearModulo.commit();
        console.log('Registro creado OK Tabla Modulo')
        return newModulo;
    } catch (error) {
        await transactionCrearModulo.rollback();
        console.log(error.message);
    };
}

module.exports = {getAllModulos,createModulo};