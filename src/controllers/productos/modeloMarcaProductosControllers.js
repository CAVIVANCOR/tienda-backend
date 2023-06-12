const {ModeloMarca, Marca, Producto} = require("../../db");
const axios = require("axios");
const regModeloMarcaProductoUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Marca,
        attributes:["descripcion","urlLogoMarca"]
    }]
};
const {where,...regModeloMarcaProductoAdmin}=regModeloMarcaProductoUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            MarcaId:elem.MarcaProductoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDModeloMarcaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await ModeloMarca.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllModeloMarcaProducto= async (isAdministrator=false)=>{
    let databaseModeloMarcaProducto = null;
    let apiModeloMarcaProductoRaw = null;
    let apiModeloMarcaProducto = null;
    let regModeloMarcaProducto = regModeloMarcaProductoUsuario;
    if (isAdministrator) regModeloMarcaProducto = regModeloMarcaProductoAdmin;
    databaseModeloMarcaProducto = await ModeloMarca.findAll(regModeloMarcaProducto);
    if (databaseModeloMarcaProducto.length===0){
        apiModeloMarcaProductoRaw = (await axios.get('http://192.168.18.15:82/modelosMarcasProductos')).data;
        apiModeloMarcaProducto = await cleanArray(apiModeloMarcaProductoRaw);
        await cargaBDModeloMarcaProducto(apiModeloMarcaProducto);
        databaseModeloMarcaProducto = await ModeloMarca.findAll(regModeloMarcaProducto);
    }
    return databaseModeloMarcaProducto;
};

const createModeloMarcaProducto = async (regModeloMarcaProducto)=>{
    const transactionCrearModeloMarcaProducto = await ModeloMarca.sequelize.transaction();
    try {
        let maxIdModeloMarcaProducto = await ModeloMarca.max("id");
        let newModeloMarcaProducto = await ModeloMarca.create({id:maxIdModeloMarcaProducto+1, ...regModeloMarcaProducto},{transaction:transactionCrearModeloMarcaProducto});
        await transactionCrearModeloMarcaProducto.commit();
        console.log('Registro creado OK Tabla ModeloMarca')
        return newModeloMarcaProducto;
    } catch (error) {
        await transactionCrearModeloMarcaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteModeloMarcaProducto = async (id)=>{
    const transactionEliminarModeloMarcaProducto = await ModeloMarca.sequelize.transaction();
    try {
        let foundModeloMarcaProducto = await ModeloMarca.findByPk(id);
        if (!foundModeloMarcaProducto) throw new Error("ID de ModeloMarca de Producto No encontrado");
        let foundProductos = await Producto.findAll({where:{ModeloMarcaId:id,borradoLogico:false}});
        if (foundProductos.length>0) throw new Error("ID de ModeloMarca de Producto tiene Productos asociados");
        let deletedModeloMarcaProducto = await foundModeloMarcaProducto.update({borradoLogico:!foundModeloMarcaProducto.borradoLogico},{transaction:transactionEliminarModeloMarcaProducto});
        await transactionEliminarModeloMarcaProducto.commit();
        console.log('Registro eliminado OK Tabla ModeloMarca de Producto');
        return deletedModeloMarcaProducto;
    } catch (error) {
        await transactionEliminarModeloMarcaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllModeloMarcaProducto,createModeloMarcaProducto,deleteModeloMarcaProducto};