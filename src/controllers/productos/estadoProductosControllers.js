const {EstadoProd} = require("../../db");
const axios = require("axios");
const regEstadoProdUsuario ={
    where: { borradoLogico: false },
};
const {where,...regEstadoProdAdmin}=regEstadoProdUsuario;
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

const cargaBDEstadoProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await EstadoProd.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllEstadoProducto= async (isAdministrator=false)=>{
    let databaseEstadoProducto = null;
    let apiEstadoProductoRaw = null;
    let apiEstadoProducto = null;
    let regEstadoProd = regEstadoProdUsuario;
    if (isAdministrator) regEstadoProd = regEstadoProdAdmin;
    databaseEstadoProducto = await EstadoProd.findAll(regEstadoProd);
    if (databaseEstadoProducto.length===0){
        apiEstadoProductoRaw = (await axios.get('http://192.168.18.15:82/estadosProductos')).data;
        apiEstadoProducto = await cleanArray(apiEstadoProductoRaw);
        await cargaBDEstadoProducto(apiEstadoProducto);
        databaseEstadoProducto = await EstadoProd.findAll(regEstadoProd);
    }
    return databaseEstadoProducto;
};

const createEstadoProducto = async (regEstadoProducto)=>{
    const transactionCrearEstadoProducto = await EstadoProd.sequelize.transaction();
    try {
        let maxIdEstadoProducto = await EstadoProd.max("id");
        let newEstadoProducto = await EstadoProd.create({id:maxIdEstadoProducto+1, ...regEstadoProducto},{transaction:transactionCrearEstadoProducto});
        await transactionCrearEstadoProducto.commit();
        console.log('Registro creado OK Tabla EstadoProd')
        return newEstadoProducto;
    } catch (error) {
        await transactionCrearEstadoProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteEstadoProducto = async (id)=>{
    const transactionEliminarEstadoProducto = await EstadoProd.sequelize.transaction();
    try {
        let foundEstadoProducto = await EstadoProd.findByPk(id);
        if (!foundEstadoProducto) throw new Error('ID de Estado producto No existe');
        let foundProductos = await EstadoProd.findAll({where:{EstadoProdId:id, borradoLogico:false}});
        if (foundProductos.length>0) throw new Error('Estado producto tiene productos asociados');
        let deletedEstadoProducto = await foundEstadoProducto.update({borradoLogico:!foundEstadoProducto.borradoLogico},{transaction:transactionEliminarEstadoProducto});
        await transactionEliminarEstadoProducto.commit();
        console.log('Estado de producto eliminado OK');
        return deletedEstadoProducto;
    } catch (error) {
        await transactionEliminarEstadoProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllEstadoProducto,createEstadoProducto, deleteEstadoProducto};
