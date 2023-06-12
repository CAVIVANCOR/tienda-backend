const {Cuentas,ConceptoMovC} = require("../../db");
const axios = require("axios");
const regCuentasUsuario ={
    where: { borradoLogico: false },
};
const {where,...regCuentasAdmin}=regCuentasUsuario;

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            nroCuenta:elem.nroCuenta,
            kardex:elem.kardex,
            moneda:elem.moneda,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCuentas = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Cuentas.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllCuentas= async (isAdministrator=false)=>{
    let databaseCuentas = null;
    let apiCuentasRaw = null;
    let apiCuentas = null;
    let regCuentas = regCuentasUsuario;
    if (isAdministrator) regCuentas = regCuentasAdmin;
    databaseCuentas = await Cuentas.findAll(regCuentas);
    if (databaseCuentas.length===0){
        apiCuentasRaw = (await axios.get('http://192.168.18.15:82/cuentas')).data;
        apiCuentas = await cleanArray(apiCuentasRaw);
        await cargaBDCuentas(apiCuentas);
        databaseCuentas = await Cuentas.findAll(regCuentas);
    }
    return databaseCuentas;
};

const createCuentas = async (regCuentas)=>{
    const transactionCrearCuentas = await Cuentas.sequelize.transaction();
    try {
        let maxIdCuentas = await Cuentas.max('id');
        let newCuentas = await Cuentas.create({id:maxIdCuentas+1, ...regCuentas},{transaction:transactionCrearCuentas});
        await transactionCrearCuentas.commit();
        console.log('Registro creado OK Tabla Cuentas')
        return newCuentas;
    } catch (error) {
        await transactionCrearCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteCuentas = async (id)=>{
    const transactionEliminarCuentas = await Cuentas.sequelize.transaction();
    try {
        let foundCuenta = await Cuentas.findByPk(id);
        if (!foundCuenta) throw new Error('No se encontro ID del registro en la Tabla Cuentas');
        let foundConceptoMovCuentas = await ConceptoMovC.findAll({
            where: {
                [Op.or]: [
                    { idCuentaOrigen: id },
                    { idCuentaDestino: id }
                ],
                borradoLogico: false}
            }
        );
        if (foundConceptoMovCuentas.length>0) throw new Error('No se puede eliminar el registro porque tiene movimientos asociados');
        let deletedCuenta = await foundCuenta.update({borradoLogico:!foundCuenta.borradoLogico},{transaction:transactionEliminarCuentas});
        await transactionEliminarCuentas.commit();
        console.log('Registro borrado OK Tabla Cuentas')
        return deletedCuenta;
    } catch (error) {
        await transactionEliminarCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllCuentas,createCuentas, deleteCuentas};