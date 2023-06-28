const {TipoDocumento, CabCompras,CabMovAlmacen,CabVentas} = require("../../db");
const axios = require("axios");
const regTipoDocumentoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regTipoDocumentoAdmin}=regTipoDocumentoUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            cesado:elem.cesado,
            iniciales:elem.iniciales,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTiposDoc = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoDocumento.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllTiposDoc= async (isAdministrator=false)=>{
    let databaseTiposDoc = null;
    let apiTiposDocRaw = null;
    let apiTiposDoc = null;
    let regTipoDocumento = regTipoDocumentoUsuario;
    if (isAdministrator) regTipoDocumento = regTipoDocumentoAdmin;
    databaseTiposDoc = await TipoDocumento.findAll(regTipoDocumento);
    if (databaseTiposDoc.length===0){
        apiTiposDocRaw = (await axios.get('http://192.168.18.15:82/tiposDocumento')).data;
        apiTiposDoc = await cleanArray(apiTiposDocRaw);
        await cargaBDTiposDoc(apiTiposDoc);
        databaseTiposDoc = await TipoDocumento.findAll(regTipoDocumento);
    }
    return databaseTiposDoc;
};

const createTipoDoc = async (regTipoDoc)=>{
    const transactionCrearTipoDoc = await TipoDocumento.sequelize.transaction();
    try {
        //await TipoDocumento.sequelize.query('Lock Table TipoDocumento',{transaction:transactionCrearTipoDoc});
        let maxIdTipoDoc = await TipoDocumento.max('id');
        let newTipoDoc = await TipoDocumento.create({id:maxIdTipoDoc+1, ...regTipoDoc},{transaction:transactionCrearTipoDoc});
        await transactionCrearTipoDoc.commit();
        console.log('Registro creado OK Tabla TipoDocumento')
        return newTipoDoc;
    } catch (error) {
        await transactionCrearTipoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteTipoDocumento = async (id)=>{
    let transactionEliminarTipoDoc = await TipoDocumento.sequelize.transaction();
    try {
        let foundTipoDocumento = await TipoDocumento.findByPk(id);
        if (!foundTipoDocumento) throw new Error('No se encontró el ID TipoDocumento');
        let foundCabCompras = await CabCompras.findAll({where:{TipoDocumentoId:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{TipoDocumentoId:id,borradoLogico:false}});
        let foundCabMovAlmacen = await CabMovAlmacen.findAll({where:{TipoDocumentoId:id,borradoLogico:false}});
        if (foundCabCompras.length>0) throw new Error('No se puede borrar el TipoDocumento porque tiene Compras asociadas');
        if (foundCabVentas.length>0) throw new Error('No se puede borrar el TipoDocumento porque tiene Ventas asociadas');
        if (foundCabMovAlmacen.length>0) throw new Error('No se puede borrar el TipoDocumento porque tiene Movimientos de Almacen asociados');
        let deletedTipoDocumento = await foundTipoDocumento.update({borradoLogico:!foundTipoDocumento.borradoLogico},{transaction:transactionEliminarTipoDoc});
        await transactionEliminarTipoDoc.commit();
        console.log('Registro eliminado OK Tabla TipoDocumento');
        return deletedTipoDocumento;
    } catch (error) {
        await transactionEliminarTipoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateTipoDocumento = async (id,regTipoDoc)=>{
    let transactionActualizarTipoDoc = await TipoDocumento.sequelize.transaction();
    try {
        let foundTipoDocumento = await TipoDocumento.findByPk(id);
        if (!foundTipoDocumento) throw new Error('No se encontró el ID TipoDocumento');
        let updatedTipoDocumento = await foundTipoDocumento.update(regTipoDoc,{transaction:transactionActualizarTipoDoc});
        await transactionActualizarTipoDoc.commit();
        console.log('Registro actualizado OK Tabla TipoDocumento');
        return updatedTipoDocumento;
    } catch (error) {
        await transactionActualizarTipoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchTipoDocumento = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundTipoDocumento = await TipoDocumento.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchTipoDocumento:Registros encontrados en Tabla TipoDocumento",foundTipoDocumento, foundTipoDocumento.length);
        return foundTipoDocumento;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllTiposDoc,createTipoDoc,deleteTipoDocumento, updateTipoDocumento, searchTipoDocumento};