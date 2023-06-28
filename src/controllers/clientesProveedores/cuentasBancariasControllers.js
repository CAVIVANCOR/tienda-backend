const {CBancariasCliProv, Bancos,DetMovCuentas} = require("../../db");
const regCBancariasCliProvUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Bancos,
        attributes:["descripcion","abreviacion","codSunat"]
    }]
};
const {where,...regCBancariasCliProvAdmin}=regCBancariasCliProvUsuario;
const getAllCuentasBancariasCliProv= async (isAdministrator=false)=>{
    let regCBancariasCliProv = regCBancariasCliProvUsuario;
    if (isAdministrator) regCBancariasCliProv = regCBancariasCliProvAdmin;
    let databaseCuentasBancariasCliProv = await CBancariasCliProv.findAll(regCBancariasCliProv);
    return databaseCuentasBancariasCliProv;
};

const createCuentasBancariasCliProv = async (regCuentasBancariasCliProv)=>{
    const transactionCrearCuentasBancariasCliProv = await CBancariasCliProv.sequelize.transaction();
    try {
        //await CBancariasCliProv.sequelize.query('Lock Table CBancariasCliProv',{transaction:transactionCrearCuentasBancariasCliProv});
        let maxIdCuentasBancariasCliProv = await CBancariasCliProv.max("id");
        let newCuentasBancariasCliProv = await CBancariasCliProv.create({id:maxIdCuentasBancariasCliProv+1, ...regCuentasBancariasCliProv},{transaction:transactionCrearCuentasBancariasCliProv});
        await transactionCrearCuentasBancariasCliProv.commit();
        console.log('Registro creado OK Tabla CBancariasCliProv')
        return newCuentasBancariasCliProv;
        } catch (error) {
            await transactionCrearCuentasBancariasCliProv.rollback();
            console.log(error.message);
            throw new Error(error.message);
        }
};

const deleteCuentasBancariasCliProv = async (id)=>{
    let transactionEliminarCuentasBancariasCliProv = await CBancariasCliProv.sequelize.transaction();
    try {
        let foundCuentasBancariasCliProv = await CBancariasCliProv.findByPk(id);
        if (!foundCuentasBancariasCliProv) throw new Error('ID CBancariasCliProv no encontrado');
        let foundDetMovCuentas = await DetMovCuentas.findAll({where:{idCuentaBancaria:id,borradoLogico:false}});
        if (foundDetMovCuentas.length>0) throw new Error("El CBancariasCliProv No puede ser eliminado,posee movimientos en Detalle Movimientos Cuentas"); 
        let deletedCuentasBancariasCliProv = await foundContactosCliProv.update({borradoLogico:!foundCuentasBancariasCliProv.borradoLogico},{transaction:transactionEliminarCuentasBancariasCliProv});
        await transactionEliminarCuentasBancariasCliProv.commit();
        console.log('Registro eliminado OK Tabla CBancariasCliProv')
        return deletedCuentasBancariasCliProv;
        } catch (error) {
            await transactionEliminarCuentasBancariasCliProv.rollback();
            console.log(error.message);
            throw new Error(error.message);
        };
};

const updateCuentasBancariasCliProv = async (id,regCuentasBancariasCliProv)=>{
    let transactionActualizarCuentasBancariasCliProv = await CBancariasCliProv.sequelize.transaction();
    try {
        let foundCuentasBancariasCliProv = await CBancariasCliProv.findByPk(id);
        if (!foundCuentasBancariasCliProv) throw new Error('ID CBancariasCliProv no encontrado');
        let updatedCuentasBancariasCliProv = await foundCuentasBancariasCliProv.update(regCuentasBancariasCliProv,{transaction:transactionActualizarCuentasBancariasCliProv});
        await transactionActualizarCuentasBancariasCliProv.commit();
        console.log('Registro actualizado OK Tabla CBancariasCliProv')
        return updatedCuentasBancariasCliProv;
        } catch (error) {
            await transactionActualizarCuentasBancariasCliProv.rollback();
            console.log(error.message);
            throw new Error(error.message);
        };
}

const searchCuentasBancariasCliProv = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsCuentasBancariasCliProv = await CBancariasCliProv.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchCuentasBancariasCliProv:Registros encontrados en Tabla CBancariasCliProv",foundRegsCuentasBancariasCliProv, foundRegsCuentasBancariasCliProv.length);
        return foundRegsCuentasBancariasCliProv;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllCuentasBancariasCliProv,createCuentasBancariasCliProv,deleteCuentasBancariasCliProv, updateCuentasBancariasCliProv, searchCuentasBancariasCliProv};
