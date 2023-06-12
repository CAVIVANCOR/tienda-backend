const {Colore, Producto} = require("../../db");
const axios = require("axios");
const regColorUsuario ={
    where: { borradoLogico: false },
};
const {where,...regColorAdmin}=regColorUsuario;
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

const cargaBDColorProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Colore.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllColorProducto= async (isAdministrator=false)=>{
    let databaseColorProducto = null;
    let apiColorProductoRaw = null;
    let apiColorProducto = null;
    let regColor = regColorUsuario;
    if (isAdministrator) regColor = regColorAdmin;
    databaseColorProducto = await Colore.findAll(regColor);
    if (databaseColorProducto.length===0){
        apiColorProductoRaw = (await axios.get('http://192.168.18.15:82/colorProductos')).data;
        apiColorProducto = await cleanArray(apiColorProductoRaw);
        await cargaBDColorProducto(apiColorProducto);
        databaseColorProducto = await Colore.findAll(regColor);
    }
    return databaseColorProducto;
};

const createColorProducto = async (regColorProducto)=>{
    const transactionCrearColorProducto = await Colore.sequelize.transaction();
    try {
        let maxIdColorProducto = await Colore.max("id");
        let newColorProducto = await Colore.create({id:maxIdColorProducto+1, ...regColorProducto},{transaction:transactionCrearColorProducto});
        await transactionCrearColorProducto.commit();
        console.log('Registro creado OK Tabla Colore')
        return newColorProducto;
    } catch (error) {
        await transactionCrearColorProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteColorProducto = async (id)=>{
    const transactionEliminarColorProducto = await Colore.sequelize.transaction();
    try {
        let foundColorProducto = await Colore.findByPk(id);
        if (!foundColorProducto) throw new Error("ID de Color de Producto No existe");
        let foundProductos = await Producto.findAll({where:{ColoreId:id, borradoLogico:false}});
        if (foundProductos.length>0) throw new Error("El Color de Producto tiene Productos asociados");
        let deletedColorProducto = await foundColorProducto.update({borradoLogico:!foundColorProducto.borradoLogico},{transaction:transactionEliminarColorProducto});
        await transactionEliminarColorProducto.commit();
        console.log('Registro eliminado OK Tabla Colore');
        return deletedColorProducto;
    } catch (error) {
        await transactionEliminarColorProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllColorProducto,createColorProducto,deleteColorProducto};