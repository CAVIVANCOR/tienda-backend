const {EstadoDoc,CabCompras,CabMovAlmacen,CabVentas} = require("../../db");
const axios = require("axios");
const regEstadoDocUsuario ={
    where: { borradoLogico: false },
};
const {where,...regEstadoDocAdmin}=regEstadoDocUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDEstadoDoc = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await EstadoDoc.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllEstadoDoc= async (isAdministrator=false)=>{
    let databaseEstadoDoc = null;
    let apiEstadoDocRaw = null;
    let apiEstadoDoc = null;
    let regEstadoDoc = regEstadoDocUsuario;
    if (isAdministrator) regEstadoDoc = regEstadoDocAdmin;
    databaseEstadoDoc = await EstadoDoc.findAll(regEstadoDoc);
    if (databaseEstadoDoc.length===0){
        apiEstadoDocRaw = (await axios.get('http://192.168.18.15:82/estadosDoc')).data;
        apiEstadoDoc = await cleanArray(apiEstadoDocRaw);
        await cargaBDEstadoDoc(apiEstadoDoc);
        databaseEstadoDoc = await EstadoDoc.findAll(regEstadoDoc);
    }
    return databaseEstadoDoc;
};

const createEstadoDoc = async (regEstadoDoc)=>{
    const transactionCrearEstadoDoc = await EstadoDoc.sequelize.transaction();
    try {
        //await EstadoDoc.sequelize.query('Lock Table EstadoDoc',{transaction:transactionCrearEstadoDoc});
        let maxIdEstadoDoc = await EstadoDoc.max('id');
        let newEstadoDoc = await EstadoDoc.create({id:maxIdEstadoDoc+1, ...regEstadoDoc},{transaction:transactionCrearEstadoDoc});
        await transactionCrearEstadoDoc.commit();
        console.log('Registro creado OK Tabla EstadoDoc')
        return newEstadoDoc;
    } catch (error) {
        await transactionCrearEstadoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteEstadoDoc = async (id)=>{
    let transactionEliminarEstadoDoc = await EstadoDoc.sequelize.transaction();
    try {
        let foundEstadoDoc = await EstadoDoc.findByPk(id);
        if (!foundEstadoDoc) throw new Error('ID EstadoDoc no encontrado');
        let foundCabCompras = await CabCompras.findAll({where:{EstadoDocId:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{EstadoDocId:id,borradoLogico:false}});
        let foundCabMovAlmacen = await CabMovAlmacen.findAll({where:{EstadoDocId:id,borradoLogico:false}});
        if (foundCabCompras.length>0) throw new Error('EstadoDoc tiene compras asociadas');
        if (foundCabVentas.length>0) throw new Error('EstadoDoc tiene ventas asociadas');
        if (foundCabMovAlmacen.length>0) throw new Error('EstadoDoc tiene movimientos de almacen asociados');
        let deletedEstadoDoc = await foundEstadoDoc.update({borradoLogico:!foundEstadoDoc.borradoLogico},{transaction:transactionEliminarEstadoDoc});
        await transactionEliminarEstadoDoc.commit();
        console.log('Registro eliminado OK Tabla EstadoDoc')
        return deletedEstadoDoc;
    } catch (error) {
        await transactionEliminarEstadoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateEstadoDoc = async (id,regEstadoDoc)=>{
    let transactionActualizarEstadoDoc = await EstadoDoc.sequelize.transaction();
    try {
        let foundEstadoDoc = await EstadoDoc.findByPk(id);
        if (!foundEstadoDoc) throw new Error('ID EstadoDoc no encontrado');
        let updatedEstadoDoc = await foundEstadoDoc.update(regEstadoDoc,{transaction:transactionActualizarEstadoDoc});
        await transactionActualizarEstadoDoc.commit();
        console.log('Registro actualizado OK Tabla EstadoDoc')
        return updatedEstadoDoc;
    } catch (error) {
        await transactionActualizarEstadoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};


const searchEstadoDoc = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundEstadoDoc = await EstadoDoc.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchEstadoDoc:Registros encontrados en Tabla EstadoDoc",foundEstadoDoc, foundEstadoDoc.length);
        return foundEstadoDoc;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};


module.exports = {getAllEstadoDoc,createEstadoDoc,deleteEstadoDoc, updateEstadoDoc, searchEstadoDoc};