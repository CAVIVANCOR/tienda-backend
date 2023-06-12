const {Marca,ModeloMarca} = require("../../db");
const axios = require("axios");
const regMarcaProductoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regMarcaProductoAdmin}=regMarcaProductoUsuario;
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

const cargaBDMarcaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Marca.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllMarcaProducto= async (isAdministrator=false)=>{
    let databaseMarcaProducto = null;
    let apiMarcaProductoRaw = null;
    let apiMarcaProducto = null;
    let regMarcaProducto = regMarcaProductoUsuario;
    if (isAdministrator) regMarcaProducto = regMarcaProductoAdmin;
    databaseMarcaProducto = await Marca.findAll(regMarcaProducto);
    if (databaseMarcaProducto.length===0){
        apiMarcaProductoRaw = (await axios.get('http://192.168.18.15:82/marcasProductos')).data;
        apiMarcaProducto = await cleanArray(apiMarcaProductoRaw);
        await cargaBDMarcaProducto(apiMarcaProducto);
        databaseMarcaProducto = await Marca.findAll(regMarcaProducto);
    }
    return databaseMarcaProducto;
};

const createMarcaProducto = async (regMarcaProducto)=>{
    const transactionCrearMarcaProducto = await Marca.sequelize.transaction();
    try {
        let maxIdMarcaProducto = await Marca.max("id");
        let newMarcaProducto = await Marca.create({id:maxIdMarcaProducto+1, ...regMarcaProducto},{transaction:transactionCrearMarcaProducto});
        await transactionCrearMarcaProducto.commit();
        console.log('Registro creado OK Tabla Marca')
        return newMarcaProducto;
    } catch (error) {
        await transactionCrearMarcaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteMarcaProducto = async (id)=>{
    let transactionEliminarMarcaProducto = await Marca.sequelize.transaction();
    try {
        let foundMarcaProducto = await Marca.findByPk(id);
        if (!foundMarcaProducto) throw new Error("MarcaProducto no encontrado");
        let foundModelosProductos = await ModeloMarca.findAll({where:{MarcaId:id, borradoLogico:false}});
        if (foundModelosProductos.length>0) throw new Error("MarcaProducto tiene modelos asociados");
        let deletedMarcaProducto = await foundMarcaProducto.update({borradoLogico:!foundMarcaProducto.borradoLogico},{transaction:transactionEliminarMarcaProducto});
        await transactionEliminarMarcaProducto.commit();
        console.log('Registro eliminado OK Tabla Marca de Producto')
        return deletedMarcaProducto;
    } catch (error) {
        await transactionEliminarMarcaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = {getAllMarcaProducto,createMarcaProducto};
