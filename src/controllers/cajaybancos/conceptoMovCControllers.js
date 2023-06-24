const {ConceptoMovC, Cuentas,DetMovCuentas} = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");

const regConceptoMovCUsuario ={
    where: { borradoLogico: false },
};
const {where,...regConceptoMovCAdmin}=regConceptoMovCUsuario;
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
        throw new Error(error.message);
    }
};

// const getAllConceptoMovC= async (isAdministrator=false)=>{
//     let databaseConceptoMovC = null;
//     let apiConceptoMovCRaw = null;
//     let apiConceptoMovC = null;
//     let regConceptoMovC = regConceptoMovCUsuario;
//     if (isAdministrator) regConceptoMovC = regConceptoMovCAdmin;
//     databaseConceptoMovC = await ConceptoMovC.findAll(regConceptoMovC);
//     if (databaseConceptoMovC.length===0){
//         apiConceptoMovCRaw = (await axios.get('http://192.168.18.15:82/conceptosMovsCuentas')).data;
//         apiConceptoMovC = await cleanArray(apiConceptoMovCRaw);
//         await cargaBDConceptoMovC(apiConceptoMovC);
//         databaseConceptoMovC = await ConceptoMovC.findAll(regConceptoMovC);
//     }

//     return databaseConceptoMovC;
// };

const getAllConceptoMovC = async (isAdministrator=false) => {
    try {
    let databaseConceptoMovC = null;
    let apiConceptoMovCRaw = null;
    let apiConceptoMovC = null;
    let regConceptoMovC = regConceptoMovCUsuario;
    if (isAdministrator) regConceptoMovC = regConceptoMovCAdmin;
    databaseConceptoMovC = await ConceptoMovC.findAll(regConceptoMovC);
    if (databaseConceptoMovC.length===0){
        apiConceptoMovCRaw = (await axios.get('http://192.168.18.15:82/conceptosMovsCuentas')).data;
        apiConceptoMovC = await cleanArray(apiConceptoMovCRaw);
        await cargaBDConceptoMovC(apiConceptoMovC);
        databaseConceptoMovC = await ConceptoMovC.findAll(regConceptoMovC);
    }
      const result = await Promise.all(
        databaseConceptoMovC.map(async (conceptoMovC) => {
          const cuentaOrigen = await Cuentas.findByPk(conceptoMovC.idCuentaOrigen, {
            attributes: ['descripcion'],
          });
          const cuentaDestino = await Cuentas.findByPk(conceptoMovC.idCuentaDestino, {
            attributes: ['descripcion'],
          });
          return {
            ...conceptoMovC.toJSON(),
            cuentaOrigen: cuentaOrigen.descripcion,
            cuentaDestino: cuentaDestino.descripcion,
          };
        })
      );
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };
  

const createConceptoMovC = async (regConceptoMovC)=>{
    const transactionCrearConceptoMovC = await ConceptoMovC.sequelize.transaction();
    try {
        let maxIdConceptoMovC = await ConceptoMovC.max('id');
        let newConceptoMovC = await ConceptoMovC.create({id:maxIdConceptoMovC+1, ...regConceptoMovC},{transaction:transactionCrearConceptoMovC});
        await transactionCrearConceptoMovC.commit();
        console.log('Registro creado OK Tabla ConceptoMovC')
        return newConceptoMovC;
    } catch (error) {
        await transactionCrearConceptoMovC.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteConceptoMovC = async (id)=>{
    const transactionBorrarConceptoMovC = await ConceptoMovC.sequelize.transaction();
    try {
        let foundConceptoMovC = await ConceptoMovC.findByPk(id);
        if (!foundConceptoMovC) throw new Error('Registro de la Tabla ConceptoMovC No encontrado');
        let foundDetMovCuentas = await DetMovCuentas.findAll({
            where:{
                ConceptoMovCId:id, borradoLogico:false
            }
        });
        if (foundDetMovCuentas.length > 0) throw new Error('Registro de la Tabla ConceptoMovC tiene movimientos asociados');
        let deletedConceptoMovC = await foundConceptoMovC.update({borradoLogico:!foundConceptoMovC.borradoLogico},{transaction:transactionBorrarConceptoMovC});
        await transactionBorrarConceptoMovC.commit();
        console.log('Registro borrado OK Tabla ConceptoMovC')
        return deletedConceptoMovC;
    } catch (error) {
        await transactionBorrarConceptoMovC.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateConceptoMovC = async (id,regConceptoMovC)=>{
    const transactionActualizarConceptoMovC = await ConceptoMovC.sequelize.transaction();
    try {
        let foundConceptoMovC = await ConceptoMovC.findByPk(id);
        if (!foundConceptoMovC) throw new Error('Registro de la Tabla ConceptoMovC No encontrado');
        let updatedConceptoMovC = await foundConceptoMovC.update(regConceptoMovC,{transaction:transactionActualizarConceptoMovC});
        await transactionActualizarConceptoMovC.commit();
        console.log('Registro actualizado OK Tabla ConceptoMovC')
        return updatedConceptoMovC;
    } catch (error) {
        await transactionActualizarConceptoMovC.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllConceptoMovC,createConceptoMovC, deleteConceptoMovC, updateConceptoMovC};