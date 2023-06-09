const {Chofer, TipoDocIdentidad} = require("../../db");

const getAllChofer= async ()=>{
    let databaseChofer = await Chofer.findAll({
        include:[{
            model:TipoDocIdentidad,
            attributes:["descripcion","codSunat"]
        }]
    });
    return databaseChofer;
};

const createChofer = async (regChofer)=>{
    const transactionCrearChofer = await Chofer.sequelize.transaction();
    try {
       //await Chofer.sequelize.query('Lock Table Chofer',{transaction:transactionCrearChofer});
        let maxIdChofer = await Chofer.max('id',{transaction:transactionCrearChofer});
        let newChofer = await Chofer.create({id:maxIdChofer+1, ...regChofer},{transaction:transactionCrearChofer});
        await transactionCrearChofer.commit();
        console.log('Registro creado OK Tabla Chofer')
        return newChofer;
    } catch (error) {
        await transactionCrearChofer.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllChofer, createChofer};