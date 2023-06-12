const {ConceptoAlmacen,TipoMovAlmacen,CabMovAlmacen, sequelize} = require("../../db");
const axios = require("axios");
const regConceptoAlmacenUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:TipoMovAlmacen,
        attributes:["descripcion","ingreso","salida"]
    }]
};
const {where,...regConceptoAlmacenAdmin}=regConceptoAlmacenUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codAlmacenOrigen:elem.codAlmacenOrigen,
            codAlmacenDestino:elem.codAlmacenDestino,
            prioridad:elem.prioridad,
            TipoMovAlmacenId:elem.TipoMovAlmacenId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDConceptoAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await ConceptoAlmacen.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllConceptoAlmacen= async (isAdministrator=false)=>{
    let databaseConceptoAlmacen = null;
    let apiConceptoAlmacenRaw = null;
    let apiConceptoAlmacen = null;
    let regConceptoAlmacen = regConceptoAlmacenUsuario;
    if (isAdministrator) regConceptoAlmacen = regConceptoAlmacenAdmin;
    databaseConceptoAlmacen = await ConceptoAlmacen.findAll(regConceptoAlmacen);
    if (databaseConceptoAlmacen.length===0){
        apiConceptoAlmacenRaw = (await axios.get('http://192.168.18.15:82/conceptosAlmacen')).data;
        apiConceptoAlmacen = await cleanArray(apiConceptoAlmacenRaw);
        await cargaBDConceptoAlmacen(apiConceptoAlmacen);
        databaseConceptoAlmacen = await ConceptoAlmacen.findAll(regConceptoAlmacen);
    }
    return databaseConceptoAlmacen;
};

const createConceptoAlmacen = async (regConceptoAlmacen)=>{
    const transactionCrearConceptoAlmacen = await ConceptoAlmacen.sequelize.transaction();
    try {
        let maxIdConceptoAlmacen = await ConceptoAlmacen.max('id');
        let newConceptoAlmacen = await ConceptoAlmacen.create({id:maxIdConceptoAlmacen+1, ...regConceptoAlmacen},{transaction:transactionCrearConceptoAlmacen});
        await transactionCrearConceptoAlmacen.commit();
        console.log('Registro creado OK Tabla ConceptoAlmacen')
        return newConceptoAlmacen;
    } catch (error) {
        await transactionCrearConceptoAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteConceptoAlmacen = async (id) => {
    const transactionEliminarConceptoAlmacen = await ConceptoAlmacen.sequelize.transaction();
    try {
        const foundConceptoAlmacen = await ConceptoAlmacen.findByPk(id);
        if (!foundConceptoAlmacen) throw new Error("No se a encontrado el ID en la tabla ConceptoAlmacen");
        const foundCabMovAlmacen = await CabMovAlmacen.findOne({
            where:{
                ConceptoAlmacenId:id, borradoLogico:false
            }
        })
        if (foundCabMovAlmacen) throw new Error("No se puede eliminar el registro ya que tiene movimientos asociados");
        let deletedTipoMovAlmacen = await foundConceptoAlmacen.update({borradoLogico:!foundConceptoAlmacen.borradoLogico},{transaction:transactionEliminarConceptoAlmacen});
        await transactionEliminarConceptoAlmacen.commit();
        console.log('Registro eliminado OK Tabla ConceptoAlmacen')
        return deletedTipoMovAlmacen;
    } catch (error) {
        await transactionEliminarConceptoAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllConceptoAlmacen,createConceptoAlmacen, deleteConceptoAlmacen};