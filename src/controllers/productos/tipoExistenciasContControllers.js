const {TipoExisCont, Producto} = require("../../db");
const axios = require("axios");
const regTipoExisContProductoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regTipoExisContProductoAdmin}=regTipoExisContProductoUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTipoExistenciaCont = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoExisCont.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllTipoExistenciaCont= async (isAdministrator=false)=>{
    let databaseTipoExistenciaCont = null;
    let apiTipoExistenciaContRaw = null;
    let apiTipoExistenciaCont = null;
    let regTipoExisContProducto = regTipoExisContProductoUsuario;
    if (isAdministrator) regTipoExisContProducto = regTipoExisContProductoAdmin;
    databaseTipoExistenciaCont = await TipoExisCont.findAll(regTipoExisContProducto);
    if (databaseTipoExistenciaCont.length===0){
        apiTipoExistenciaContRaw = (await axios.get('http://192.168.18.15:82/tiposExistenciasContProductos')).data;
        apiTipoExistenciaCont = await cleanArray(apiTipoExistenciaContRaw);
        await cargaBDTipoExistenciaCont(apiTipoExistenciaCont);
        databaseTipoExistenciaCont = await TipoExisCont.findAll(regTipoExisContProducto);
    }
    return databaseTipoExistenciaCont;
};

const createTipoExistenciaCont = async (regTipoExistenciaCont)=>{
    const transactionCrearTipoExistenciaCont = await TipoExisCont.sequelize.transaction();
    try {
        let maxIdTipoExistenciaCont = await TipoExisCont.max("id");
        let newTipoExistenciaCont = await TipoExisCont.create({id:maxIdTipoExistenciaCont+1, ...regTipoExistenciaCont},{transaction:transactionCrearTipoExistenciaCont});
        await transactionCrearTipoExistenciaCont.commit();
        console.log('Registro creado OK Tabla TipoExisCont')
        return newTipoExistenciaCont;
    } catch (error) {
        await transactionCrearTipoExistenciaCont.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteTipoExistenciaCont = async (id)=>{
    let transactionEliminarTipoExistenciaCont = await TipoExisCont.sequelize.transaction();
    try {
        let foundTipoExistenciaCont = await TipoExisCont.findByPk(id);
        if (!foundTipoExistenciaCont) throw new Error("ID de Registro TipoExisCont de Producto no existe");
        let foundProductos = await Producto.findAll({where:{TipoExisContId:id,borradoLogico:false}});
        if (foundProductos.length>0) throw new Error("El TipoExisCont tiene productos asociados");
        let deletedTipoExistenciaCont = await foundTipoExistenciaCont.update({borradoLogico:!foundTipoExistenciaCont.borradoLogico},{transaction:transactionEliminarTipoExistenciaCont});
        await transactionEliminarTipoExistenciaCont.commit();
        console.log('Registro eliminado OK Tabla TipoExisCont')
        return deletedTipoExistenciaCont;
    } catch (error) {
        await transactionEliminarTipoExistenciaCont.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateTipoExistenciaCont = async (id,regTipoExistenciaCont)=>{
    const transactionActualizarTipoExistenciaCont = await TipoExisCont.sequelize.transaction();
    try {
        let foundTipoExistenciaCont = await TipoExisCont.findByPk(id);
        if (!foundTipoExistenciaCont) throw new Error("ID de Registro TipoExisCont de Producto no existe");
        let updatedTipoExistenciaCont = await foundTipoExistenciaCont.update(regTipoExistenciaCont,{transaction:transactionActualizarTipoExistenciaCont});
        await transactionActualizarTipoExistenciaCont.commit();
        console.log('Registro actualizado OK Tabla TipoExisCont')
        return updatedTipoExistenciaCont;
    } catch (error) {
        await transactionActualizarTipoExistenciaCont.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllTipoExistenciaCont,createTipoExistenciaCont, deleteTipoExistenciaCont, updateTipoExistenciaCont};