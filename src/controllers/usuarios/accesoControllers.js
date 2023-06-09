const {Acceso, Modulo, SubModulo} = require("../../db");

const getAllAccesos= async ()=>{
    let databaseAccesos = await Acceso.findAll({
        include:[{
            model:SubModulo,
            attributes:["descripcion"],
            include:[{
                model:Modulo,
                attributes:["descripcion"]
            }]
        }]
    });
    return databaseAccesos;
};

const createAccesos = async (regAccesos)=>{
    const transactionCrearAcceso = await Acceso.sequelize.transaction();
    try {
        //await Acceso.sequelize.query('Lock Table Acceso',{transaction:transactionCrearAcceso});
        let maxIdAcceso = await Acceso.max('id',{transaction:transactionCrearAcceso});
        let newAcceso = await Acceso.create({id:maxIdAcceso+1, ...regAccesos},{transaction:transactionCrearAcceso});
        await transactionCrearAcceso.commit();
        console.log('Registro creado OK Tabla Acceso')
        return newAcceso;
    } catch (error) {
        await transactionCrearAcceso.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllAccesos,createAccesos};