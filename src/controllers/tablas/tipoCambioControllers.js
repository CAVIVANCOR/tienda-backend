const {TipoCambio,CabCompras,CabMovAlmacen,CabVentas} = require("../../db");
const axios = require("axios");
const regTipoCambioUsuario ={
    where: { borradoLogico: false },
};
const {where,...regTipoCambioAdmin}=regTipoCambioUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            fecha:elem.fecha,
            compra:elem.compra,
            venta:elem.venta,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTiposCambio = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoCambio.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllTiposCambio= async (isAdministrator=false)=>{
    let databaseTiposCambio = null;
    let apiTiposCambioRaw = null;
    let apiTiposCambio = null;
    let regTipoCambio = regTipoCambioUsuario;
    if (isAdministrator) regTipoCambio = regTipoCambioAdmin;
    databaseTiposCambio = await TipoCambio.findAll(regTipoCambio);
    if (databaseTiposCambio.length===0){
        apiTiposCambioRaw = (await axios.get('http://192.168.18.15:82/tiposCambio')).data;
        apiTiposCambio = await cleanArray(apiTiposCambioRaw);
        await cargaBDTiposCambio(apiTiposCambio);
        databaseTiposCambio = await TipoCambio.findAll(regTipoCambio);
    }
    return databaseTiposCambio;
};

const createTiposCambio = async (regTiposCambio)=>{
    const transactionCrearTiposCambio = await TipoCambio.sequelize.transaction();
    try {
        //await TipoCambio.sequelize.query('Lock Table TipoCambio',{transaction:transactionCrearTiposCambio});
        let maxIdTiposCambio = await TipoCambio.max('id');
        let newTiposCambio = await TipoCambio.create({id:maxIdTiposCambio+1, ...regTiposCambio},{transaction:transactionCrearTiposCambio});
        await transactionCrearTiposCambio.commit();
        console.log('Registro creado OK Tabla TipoCambio')
        return newTiposCambio;
    } catch (error) {
        await transactionCrearTiposCambio.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteteTiposCambio = async (id)=>{
    let transactionEliminarTiposCambio = await TipoCambio.sequelize.transaction();
    try {
        let foundTipoCambio = await TipoCambio.findByPk(id);
        if (!foundTipoCambio) throw new Error("No se encontró el ID tipo de cambio");
        let foundCabCompras = await CabCompras.findAll({where:{TipoCambioId:id, borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{TipoCambioId:id, borradoLogico:false}});
        let foundCabMovAlmacen = await CabMovAlmacen.findAll({where:{TipoCambioId:id, borradoLogico:false}});
        if (foundCabCompras.length>0) throw new Error("No se puede eliminar el tipo de cambio porque tiene compras asociadas");
        if (foundCabVentas.length>0) throw new Error("No se puede eliminar el tipo de cambio porque tiene ventas asociadas");
        if (foundCabMovAlmacen.length>0) throw new Error("No se puede eliminar el tipo de cambio porque tiene movimientos de almacen asociados");
        let deletetedTiposCambio = await foundTipoCambio.update({borradoLogico:!foundTipoCambio.borradoLogico},{transaction:transactionEliminarTiposCambio});
        await transactionEliminarTiposCambio.commit();
        console.log('Registro eliminado OK Tabla TipoCambio');
        return deletetedTiposCambio;
    } catch (error) {
        await transactionEliminarTiposCambio.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateTiposCambio = async (id,regTiposCambio)=>{
    let transactionActualizarTiposCambio = await TipoCambio.sequelize.transaction();
    try {
        let foundTipoCambio = await TipoCambio.findByPk(id);
        if (!foundTipoCambio) throw new Error("No se encontró el ID tipo de cambio");
        let updatedTiposCambio = await foundTipoCambio.update(regTiposCambio,{transaction:transactionActualizarTiposCambio});
        await transactionActualizarTiposCambio.commit();
        console.log('Registro actualizado OK Tabla TipoCambio');
        return updatedTiposCambio;
    } catch (error) {
        await transactionActualizarTiposCambio.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchTiposCambio = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundTiposCambio = await TipoCambio.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchTiposCambio:Registros encontrados en Tabla TipoCambio",foundTiposCambio, foundTiposCambio.length);
        return foundTiposCambio;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllTiposCambio,createTiposCambio,deleteteTiposCambio, updateTiposCambio, searchTiposCambio};