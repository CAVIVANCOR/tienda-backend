const {TransportistaCliProv,TipoDocIdentidad} = require("../../db");

const getAllTransportistaCliProv= async ()=>{
    let databaseTransportistaCliProv = await TransportistaCliProv.findAll();
    return databaseTransportistaCliProv;
};

const createTransportistaCliProv = async (regTransportistaCliProv)=>{
    const transactionCrearTransportistaCliProv = await TransportistaCliProv.sequelize.transaction();
    try {
        //await TransportistaCliProv.sequelize.query('Lock Table TransportistaCliProv',{transaction:transactionCrearTransportistaCliProv});
        let maxIdTransportistaCliProv = await TransportistaCliProv.max("id", {transaction:transactionCrearTransportistaCliProv});
        let newTransportistaCliProv = await TransportistaCliProv.create({id:maxIdTransportistaCliProv+1, ...regTransportistaCliProv},{transaction:transactionCrearTransportistaCliProv});
        await transactionCrearTransportistaCliProv.commit();
        console.log('Registro creado OK Tabla TransportistaCliProv')
        return newTransportistaCliProv;
    } catch (error) {
        await transactionCrearTransportistaCliProv.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllTransportistaCliProv,createTransportistaCliProv};