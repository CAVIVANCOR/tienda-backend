const {Procedencia,Producto} = require("../../db");
const axios = require("axios");
const regProcedenciaProductoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regProcedenciaProductoAdmin}=regProcedenciaProductoUsuario;
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

const cargaBDProcedenciaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Procedencia.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllProcedenciaProducto= async (isAdministrator=false)=>{
    let databaseProcedenciaProducto = null;
    let apiProcedenciaProductoRaw = null;
    let apiProcedenciaProducto = null;
    let regProcedenciaProducto = regProcedenciaProductoUsuario;
    if (isAdministrator) regProcedenciaProducto = regProcedenciaProductoAdmin;
    databaseProcedenciaProducto = await Procedencia.findAll(regProcedenciaProducto);
    if (databaseProcedenciaProducto.length===0){
        apiProcedenciaProductoRaw = (await axios.get('http://192.168.18.15:82/procedenciasProductos')).data;
        apiProcedenciaProducto = await cleanArray(apiProcedenciaProductoRaw);
        await cargaBDProcedenciaProducto(apiProcedenciaProducto);
        databaseProcedenciaProducto = await Procedencia.findAll(regProcedenciaProducto);
    }
    return databaseProcedenciaProducto;
};

const createProcedenciaProducto = async (regProcedenciaProducto)=>{
    const transactionCrearProcedenciaProducto = await Procedencia.sequelize.transaction();
    try {
        let maxIdProcedenciaProducto = await Procedencia.max("id");
        let newProcedenciaProducto = await Procedencia.create({id:maxIdProcedenciaProducto+1, ...regProcedenciaProducto},{transaction:transactionCrearProcedenciaProducto});
        await transactionCrearProcedenciaProducto.commit();
        console.log('Registro creado OK Tabla Procedencia')
        return newProcedenciaProducto;
    } catch (error) {
        await transactionCrearProcedenciaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteProcedenciaProducto = async (id)=>{
    let transactionEliminarProcedenciaProducto = await Procedencia.sequelize.transaction();
    try {
        let foundProcedenciaProducto = await Procedencia.findByPk(id);
        if (!foundProcedenciaProducto) throw new Error("No se encontró el registro a eliminar en la Tabla Procedencia");
        let foundProductos = await Producto.findAll({where:{ProcedenciumId:id, borradoLogico:false}});
        if (foundProductos.length>0) throw new Error("No se puede eliminar el registro de Procedencia Producto ya que tiene productos asociados");
        let deletedProcedenciaProducto = await foundProcedenciaProducto.update({borradoLogico:!foundProcedenciaProducto.borradoLogico},{transaction:transactionEliminarProcedenciaProducto});
        await transactionEliminarProcedenciaProducto.commit();
        console.log('Registro eliminado OK Tabla Procedencia de Producto')
        return deletedProcedenciaProducto;
    } catch (error) {
        await transactionEliminarProcedenciaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllProcedenciaProducto,createProcedenciaProducto, deleteProcedenciaProducto};