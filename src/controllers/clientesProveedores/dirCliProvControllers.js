const {DirCliProv,Distrito,Provincia,Departamento,Pais} = require("../../db");

const getAllDirCliProv= async ()=>{
    let databaseDirCliProv = await DirCliProv.findAll({
        include:[{
            model:Distrito,
            attributes:["descripcion","codSunat","codPostal"],
            include:[{
                model:Provincia,
                attributes:["descripcion","codSunat"],
                include:[{
                    model:Departamento,
                    attributes:["descripcion","codSunat"],
                        include:[{
                            model:Pais,
                            attributes:["descripcion","codSunat"],
                            required:true
                        }]
                }]
            }]
        }]
    });
    return databaseDirCliProv;
};

const createDirCliProv = async (regDirCliProv)=>{
    const transactionCrearDirCliProv = await DirCliProv.sequelize.transaction();
    try {
        //await DirCliProv.sequelize.query('Lock Table DirCliProv',{transaction:transactionCrearDirCliProv});
        let maxIdDirCliProv = await DirCliProv.max("id", {transaction:transactionCrearDirCliProv});
        let newDirCliProv = await DirCliProv.create({id:maxIdDirCliProv+1, ...regDirCliProv},{transaction:transactionCrearDirCliProv});
        await transactionCrearDirCliProv.commit();
        console.log('Registro creado OK Tabla DirCliProv')
        return newDirCliProv;
        } catch (error) {
            await transactionCrearDirCliProv.rollback();
            console.log(error.message);
        };
};

module.exports = {getAllDirCliProv,createDirCliProv};

