const {FormaPago,CabCompras,CabVentas} = require("../../db");
const axios = require("axios");
const regFormaPagoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regFormaPagoAdmin}=regFormaPagoUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            nDias:elem.nDias,
            contado:elem.contado,
            tipo:elem.tipo,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDFormaPago = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await FormaPago.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllFormaPago= async (isAdministrator=false)=>{
    let databaseFormaPago = null;
    let apiFormaPagoRaw = null;
    let apiFormaPago = null;
    let regFormaPago = regFormaPagoUsuario;
    if (isAdministrator) regFormaPago = regFormaPagoAdmin;
    databaseFormaPago = await FormaPago.findAll(regFormaPago);
    if (databaseFormaPago.length===0){
        apiFormaPagoRaw = (await axios.get('http://192.168.18.15:82/formasPago')).data;
        apiFormaPago = await cleanArray(apiFormaPagoRaw);
        await cargaBDFormaPago(apiFormaPago);
        databaseFormaPago = await FormaPago.findAll(regFormaPago);
    }
    return databaseFormaPago;
};

const createFormaPago = async (regFormaPago)=>{
    const transactionCrearFormaPago = await FormaPago.sequelize.transaction();
    try {
        //await FormaPago.sequelize.query('Lock Table FormaPago',{transaction:transactionCrearFormaPago});
        let maxIdFormaPago = await FormaPago.max("id");
        let newFormaPago = await FormaPago.create({id:maxIdFormaPago+1, ...regFormaPago},{transaction:transactionCrearFormaPago});
        await transactionCrearFormaPago.commit();
        console.log('Registro creado OK Tabla FormaPago')
        return newFormaPago;
    } catch (error) {
        await transactionCrearFormaPago.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteFormaPago = async (id)=>{
    const transactionEliminarFormaPago = await FormaPago.sequelize.transaction();
    try {
        let foundFormaPago = await FormaPago.findByPk(id);
        if (!foundFormaPago) throw new Error('ID de FormaPago no encontrado');
        let foundCabCompras = await CabCompras.findAll({where:{FormaPagoId:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{FormaPagoId:id,borradoLogico:false}});
        if (foundCabCompras.length>0) throw new Error('La forma de pago tiene Compras asociadas');
        if (foundCabVentas.length>0) throw new Error('La forma de pago tiene Ventas asociadas');
        let deletedFormaPago = await foundFormaPago.update({borradoLogico:!foundFormaPago.borradoLogico},{transaction:transactionEliminarFormaPago});
        await transactionEliminarFormaPago.commit();
        console.log('Registro eliminado OK Tabla FormaPago');
        return deletedFormaPago;
    } catch (error) {
        await transactionEliminarFormaPago.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllFormaPago,createFormaPago,deleteFormaPago};