const {Bancos,DetMovCuentas} = require("../../db");
const axios = require("axios");
const regBancosUsuario ={
    where: { borradoLogico: false },
};
const {where,...regBancosAdmin}=regBancosUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            abreviacion:elem.abreviacion,
        };
    });
    return clean;
};

const cargaBDBancos = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Bancos.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllBancos= async (isAdministrator=false)=>{
    let databaseBancos = null;
    let apiBancosRaw = null;
    let apiBancos = null;
    let regBancos = regBancosUsuario;
    if (isAdministrator) regBancos = regBancosAdmin;
    databaseBancos = await Bancos.findAll();
    if (databaseBancos.length===0){
        apiBancosRaw = (await axios.get('http://192.168.18.15:82/bancos')).data;
        apiBancos = await cleanArray(apiBancosRaw);
        await cargaBDBancos(apiBancos);
        databaseBancos = await Bancos.findAll();
    }
    return databaseBancos;
};

const createBancos = async (regBancos)=>{
    const transactionCrearBancos = await Bancos.sequelize.transaction();
    try {
       // await Bancos.sequelize.query('Lock Table Bancos',{transaction:transactionCrearBancos});
        let maxIdBancos = await Bancos.max("id");
        let newBancos = await Bancos.create({id:maxIdBancos+1, ...regBancos},{transaction:transactionCrearBancos});
        await transactionCrearBancos.commit();
        console.log('Registro creado OK Tabla Bancos')
        return newBancos;
    } catch (error) {
        await transactionCrearBancos.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteBanco = async (id)=>{
    const transactionEliminarBanco = await Bancos.sequelize.transaction();
    try {
        let foundbanco = await Bancos.findByPk(id);
        if (!foundbanco) throw new Error('ID de Registro en Bancos No encontrado');
        let foundDetMovCuentas = await DetMovCuentas.findAll({where:{BancoId:id, borradoLogico:false}});
        if (foundDetMovCuentas.length>0) throw new Error('El Banco tiene Cuentas Asociadas');
        let deletedBanco = await foundbanco.update({borradoLogico:!foundbanco.borradoLogico},{transaction:transactionEliminarBanco});
        await transactionEliminarBanco.commit();
        console.log('Registro eliminado OK Tabla Bancos')
        return deletedBanco;
    } catch (error) {
        await transactionEliminarBanco.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

const updateBanco = async (id,regBancos)=>{
    const transactionActualizarBanco = await Bancos.sequelize.transaction();
    try {
        let foundbanco = await Bancos.findByPk(id);
        if (!foundbanco) throw new Error('ID de Registro en Bancos No encontrado');
        let updatedBanco = await foundbanco.update(regBancos,{transaction:transactionActualizarBanco});
        await transactionActualizarBanco.commit();
        console.log('Registro actualizado OK Tabla Bancos')
        return updatedBanco;
    } catch (error) {
        await transactionActualizarBanco.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllBancos,createBancos,deleteBanco, updateBanco};