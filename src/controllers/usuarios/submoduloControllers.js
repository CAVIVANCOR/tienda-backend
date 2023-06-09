const {SubModulo, Modulo} = require("../../db");

const getAllSubModulos= async ()=>{
    let databaseSubModulos = await SubModulo.findAll({
        include:[{
            model:Modulo,
            attributes:["descripcion"]
        }]
    });
    return databaseSubModulos;
};

const createSubModulo = async (regSubModulo)=>{
    const transactionCrearSubModulo = await SubModulo.sequelize.transaction();
    try {
       // await SubModulo.sequelize.query('Lock Table SubModulo',{transaction:transactionCrearSubModulo});
        let maxIdSubModulo = await SubModulo.max('id',{transaction:transactionCrearSubModulo});
        let newSubModulo = await SubModulo.create({id:maxIdSubModulo+1, ...regSubModulo},{transaction:transactionCrearSubModulo});
        await transactionCrearSubModulo.commit();
        console.log('Registro creado OK Tabla SubModulo')
        return newSubModulo;
    } catch (error) {
        await transactionCrearSubModulo.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllSubModulos,createSubModulo};