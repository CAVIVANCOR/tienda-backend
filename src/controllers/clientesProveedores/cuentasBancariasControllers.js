const {CBancariasCliProv, Bancos} = require("../../db");

const getAllCuentasBancariasCliProv= async ()=>{
    let databaseCuentasBancariasCliProv = await CBancariasCliProv.findAll({
        include:[{
            model:Bancos,
            attributes:["descripcion","abreviacion","codSunat"]
        }]
    });
    return databaseCuentasBancariasCliProv;
};

const createCuentasBancariasCliProv = async (regCuentasBancariasCliProv)=>{
    const transactionCrearCuentasBancariasCliProv = await CBancariasCliProv.sequelize.transaction();
    try {
        //await CBancariasCliProv.sequelize.query('Lock Table CBancariasCliProv',{transaction:transactionCrearCuentasBancariasCliProv});
        let maxIdCuentasBancariasCliProv = await CBancariasCliProv.max("id", {transaction:transactionCrearCuentasBancariasCliProv});
        let newCuentasBancariasCliProv = await CBancariasCliProv.create({id:maxIdCuentasBancariasCliProv+1, ...regCuentasBancariasCliProv},{transaction:transactionCrearCuentasBancariasCliProv});
        await transactionCrearCuentasBancariasCliProv.commit();
        console.log('Registro creado OK Tabla CBancariasCliProv')
        return newCuentasBancariasCliProv;
        } catch (error) {
            await transactionCrearCuentasBancariasCliProv.rollback();
            console.log(error.message);
        }
};

module.exports = {getAllCuentasBancariasCliProv,createCuentasBancariasCliProv};