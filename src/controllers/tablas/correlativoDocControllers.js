const {CorrelativoDoc,TipoDocumento,CabMovAlmacen,CabCompras,CabVentas} = require("../../db");
const axios = require("axios");
const regCorrelativoDocUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:TipoDocumento,
        attributes:["descripcion","iniciales","codSunat"]
    }]
};
const {where,...regCorrelativoDocAdmin}=regCorrelativoDocUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            serie:elem.serie,
            correlativo:elem.correlativo,
            nroCeros:elem.nroCeros,
            TipoDocumentoId:elem.TipoDocumentoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCorrelativoDoc = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await CorrelativoDoc.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllCorrelativoDoc= async (isAdministrator=false)=>{
    let databaseCorrelativoDoc = null;
    let apiCorrelativoDocRaw = null;
    let apiCorrelativoDoc = null;
    let regCorrelativoDoc = regCorrelativoDocUsuario;
    if (isAdministrator) regCorrelativoDoc = regCorrelativoDocAdmin;
    databaseCorrelativoDoc = await CorrelativoDoc.findAll(regCorrelativoDoc);
    if (databaseCorrelativoDoc.length===0){
        apiCorrelativoDocRaw = (await axios.get('http://192.168.18.15:82/correlativosDoc')).data;
        apiCorrelativoDoc = await cleanArray(apiCorrelativoDocRaw);
        await cargaBDCorrelativoDoc(apiCorrelativoDoc);
        databaseCorrelativoDoc = await CorrelativoDoc.findAll(regCorrelativoDoc);
    }
    return databaseCorrelativoDoc;
};

const createCorrelativoDoc = async (regCorrelativoDoc)=>{
    const transactionCrearCorrelativoDoc = await CorrelativoDoc.sequelize.transaction();
    try {
        //await CorrelativoDoc.sequelize.query('Lock Table CorrelativoDoc',{transaction:transactionCrearCorrelativoDoc});
        let maxIdCorrelativoDoc = await CorrelativoDoc.max('id');
        let newCorrelativoDoc = await CorrelativoDoc.create({id:maxIdCorrelativoDoc+1, ...regCorrelativoDoc},{transaction:transactionCrearCorrelativoDoc});
        await transactionCrearCorrelativoDoc.commit();
        console.log('Registro creado OK Tabla CorrelativoDoc')
        return newCorrelativoDoc;
    } catch (error) {
        await transactionCrearCorrelativoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteCorrelativoDoc = async (id)=>{
    let transactionEliminarCorrelativoDoc = await CorrelativoDoc.sequelize.transaction();
    try {
        let foundCorrelativoDoc = await CorrelativoDoc.findByPk(id);
        if (!foundCorrelativoDoc) throw new Error('ID CorrelativoDoc No encontrado');
        let foundCabMovAlmacen = await CabMovAlmacen.findAll({where:{CorrelativoDocId:id,borradoLogico:false}});
        let foundCabCompras = await CabCompras.findAll({where:{CorrelativoDocId:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{CorrelativoDocId:id,borradoLogico:false}});
        if (foundCabMovAlmacen.length>0) throw new Error('CorrelativoDoc tiene movimientos almacen ');
        if (foundCabCompras.length>0) throw new Error('CorrelativoDoc tiene compras');
        if (foundCabVentas.length>0) throw new Error('CorrelativoDoc tiene ventas');
        let deletedCorrelativoDoc = await foundCorrelativoDoc.update({borradoLogico:!foundCorrelativoDoc.borradoLogico},{transaction:transactionEliminarCorrelativoDoc});
        await transactionEliminarCorrelativoDoc.commit();
        console.log('Registro eliminado OK Tabla CorrelativoDoc');
        return deletedCorrelativoDoc;
    } catch (error) {
        await transactionEliminarCorrelativoDoc.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = {getAllCorrelativoDoc,createCorrelativoDoc,deleteCorrelativoDoc};