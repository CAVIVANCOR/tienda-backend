const {TipoMovAlmacen,ConceptoAlmacen} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            ingreso:elem.ingreso,
            salida:elem.salida,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTipoMovAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoMovAlmacen.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllTipoMovAlmacen= async ()=>{
    let databaseTipoMovAlmacen = null;
    let apiTipoMovAlmacenRaw = null;
    let apiTipoMovAlmacen = null;
    databaseTipoMovAlmacen = await TipoMovAlmacen.findAll();
    if (databaseTipoMovAlmacen.length===0){
        apiTipoMovAlmacenRaw = (await axios.get('http://192.168.18.15:82/tiposMovAlmacen')).data;
        apiTipoMovAlmacen = await cleanArray(apiTipoMovAlmacenRaw);
        await cargaBDTipoMovAlmacen(apiTipoMovAlmacen);
        databaseTipoMovAlmacen = await TipoMovAlmacen.findAll();
    }
    return databaseTipoMovAlmacen;
};

const createTipoMovAlmacen = async (regTipoMovAlmacen)=>{
    const transactionCrearTipoMovAlmacen = await TipoMovAlmacen.sequelize.transaction();
    try {
        let maxIdTipoMovAlmacen = await TipoMovAlmacen.max('id',{transaction:transactionCrearTipoMovAlmacen});
        let newTipoMovAlmacen = await TipoMovAlmacen.create({id:maxIdTipoMovAlmacen+1, ...regTipoMovAlmacen},{transaction:transactionCrearTipoMovAlmacen});
        await transactionCrearTipoMovAlmacen.commit();
        console.log('Registro creado OK Tabla TipoMovAlmacen')
        return newTipoMovAlmacen;
    } catch (error) {
        await transactionCrearTipoMovAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteTipoMovAlmacen = async (id) => {
    const transactionEliminarTipoMovAlmacen = await TipoMovAlmacen.sequelize.transaction();
    try {
        let foundTipoMovAlmacen = await TipoMovAlmacen.findByPk(id);
        if (!foundTipoMovAlmacen) throw new Error('No se encontro el ID del Tipo de Movimiento Almacen');
        let foundConceptoAlmacen = await ConceptoAlmacen.findOne({
            where: { TipoMovAlmacenId: id }
        });
        if (foundConceptoAlmacen) throw new Error('El Tipo de Movimiento Almacen tiene conceptos asociados');
        let deletedTipoMovAlmacen = await TipoMovAlmacen.update( 
            { borradoLogico: !foundAlmacen.borradoLogico },
            { where:{id} },
            { transaction: transactionEliminarTipoMovAlmacen },
            );
        await transactionEliminarTipoMovAlmacen.commit();
        console.log('Registro eliminado OK Tabla TipoMovAlmacen')
        return deletedTipoMovAlmacen;
    } catch (error) {
        await transactionEliminarTipoMovAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllTipoMovAlmacen,createTipoMovAlmacen, deleteTipoMovAlmacen};