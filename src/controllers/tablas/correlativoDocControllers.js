const {CorrelativoDoc,TipoDocumento} = require("../../db");
const axios = require("axios");

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
        console.log(error.message)
    }
};

const getAllCorrelativoDoc= async ()=>{
    let databaseCorrelativoDoc = null;
    let apiCorrelativoDocRaw = null;
    let apiCorrelativoDoc = null;
    databaseCorrelativoDoc = await CorrelativoDoc.findAll({
        include:[{
            model:TipoDocumento,
            attributes:["descripcion","iniciales","codSunat"]
        }]
    });
    if (databaseCorrelativoDoc.length===0){
        apiCorrelativoDocRaw = (await axios.get('http://192.168.18.15:82/correlativosDoc')).data;
        apiCorrelativoDoc = await cleanArray(apiCorrelativoDocRaw);
        await cargaBDCorrelativoDoc(apiCorrelativoDoc);
        databaseCorrelativoDoc = await CorrelativoDoc.findAll({
            include:[{
                model:TipoDocumento,
                attributes:["descripcion","iniciales","codSunat"]
            }]
        });
    }
    return databaseCorrelativoDoc;
};

const createCorrelativoDoc = async (regCorrelativoDoc)=>{
    const transactionCrearCorrelativoDoc = await CorrelativoDoc.sequelize.transaction();
    try {
        //await CorrelativoDoc.sequelize.query('Lock Table CorrelativoDoc',{transaction:transactionCrearCorrelativoDoc});
        let maxIdCorrelativoDoc = await CorrelativoDoc.max('id',{transaction:transactionCrearCorrelativoDoc});
        let newCorrelativoDoc = await CorrelativoDoc.create({id:maxIdCorrelativoDoc+1, ...regCorrelativoDoc},{transaction:transactionCrearCorrelativoDoc});
        await transactionCrearCorrelativoDoc.commit();
        console.log('Registro creado OK Tabla CorrelativoDoc')
        return newCorrelativoDoc;
    } catch (error) {
        await transactionCrearCorrelativoDoc.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllCorrelativoDoc,createCorrelativoDoc};