const {DatoGlobal,sequelize} = require("../../db");

const getAllDatosGlobales= async ()=>{
    let databaseDatosGlobales = await DatoGlobal.findAll();
    return databaseDatosGlobales;
};

// const createDatosGlobales = async (regDatosGlobales)=>{
//     const transactionCrearDatosGlobales = await sequelize.transaction();
//     try {
//         let newDatosGlobales = await DatoGlobal.create(regDatosGlobales,{transaction:transactionCrearDatosGlobales});
//         await transactionCrearDatosGlobales.commit();
//         console.log('Registro creado OK Tabla DatoGlobal')
//         return newDatosGlobales;
//     } catch (error) {
//         await transactionCrearDatosGlobales.rollback();
//         console.log(error.message);
//     };
// };

const createDatosGlobales = async (regDatosGlobales)=>{
    const transactionCrearDatosGlobales = await sequelize.transaction();
    try {
        let countDatosGlobales = await DatoGlobal.count({transaction:transactionCrearDatosGlobales});
        let maxIdDatosGlobales = countDatosGlobales > 0 ? await DatoGlobal.max('id',{transaction:transactionCrearDatosGlobales}) : 0;
        let newDatosGlobales = await DatoGlobal.create({id:maxIdDatosGlobales+1, ...regDatosGlobales},{transaction:transactionCrearDatosGlobales});
        await transactionCrearDatosGlobales.commit();
        console.log('Registro creado OK Tabla DatoGlobal')
        return newDatosGlobales;
    } catch (error) {
        await transactionCrearDatosGlobales.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllDatosGlobales,createDatosGlobales};