const {ContactosCliProv} = require("../../db");

const getAllContactosCliProv= async ()=>{
    let databaseContactosCliProv = await ContactosCliProv.findAll();
    return databaseContactosCliProv;
};

const createContactosCliProv = async (regContactosCliProv)=>{
    const transactionCrearContactosCliProv = await ContactosCliProv.sequelize.transaction();
    try {
        //await ContactosCliProv.sequelize.query('Lock Table ContactosCliProv',{transaction:transactionCrearContactosCliProv});
        let maxIdContactosCliProv = await ContactosCliProv.max("id", {transaction:transactionCrearContactosCliProv});
        let newContactosCliProv = await ContactosCliProv.create({id:maxIdContactosCliProv+1, ...regContactosCliProv},{transaction:transactionCrearContactosCliProv});
        await transactionCrearContactosCliProv.commit();
        console.log('Registro creado OK Tabla ContactosCliProv')
        return newContactosCliProv;
    } catch (error) {
        await transactionCrearContactosCliProv.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllContactosCliProv,createContactosCliProv};