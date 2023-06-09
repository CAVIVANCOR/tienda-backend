const {ConceptoMovC} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            idCuentaOrigen:elem.idCuentaOrigen,
            idCuentaDestino:elem.idCuentaDestino,
            prioridad:elem.prioridad,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDConceptoMovC = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await ConceptoMovC.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllConceptoMovC= async ()=>{
    let databaseConceptoMovC = null;
    let apiConceptoMovCRaw = null;
    let apiConceptoMovC = null;
    databaseConceptoMovC = await ConceptoMovC.findAll();
    if (databaseConceptoMovC.length===0){
        apiConceptoMovCRaw = (await axios.get('http://192.168.18.15:82/conceptosMovsCuentas')).data;
        apiConceptoMovC = await cleanArray(apiConceptoMovCRaw);
        await cargaBDConceptoMovC(apiConceptoMovC);
        databaseConceptoMovC = await ConceptoMovC.findAll();
    }
    return databaseConceptoMovC;
};

const createConceptoMovC = async (regConceptoMovC)=>{
    const transactionCrearConceptoMovC = await ConceptoMovC.sequelize.transaction();
    try {
        let maxIdConceptoMovC = await ConceptoMovC.max('id',{transaction:transactionCrearConceptoMovC});
        let newConceptoMovC = await ConceptoMovC.create({id:maxIdConceptoMovC+1, ...regConceptoMovC},{transaction:transactionCrearConceptoMovC});
        await transactionCrearConceptoMovC.commit();
        console.log('Registro creado OK Tabla ConceptoMovC')
        return newConceptoMovC;
    } catch (error) {
        await transactionCrearConceptoMovC.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllConceptoMovC,createConceptoMovC};