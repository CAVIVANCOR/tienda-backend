const {Materiale, Producto} = require("../../db");
const axios = require("axios");
const regMaterialeProductoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regMaterialeProductoAdmin}=regMaterialeProductoUsuario;
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

const cargaBDMaterialProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Materiale.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllMaterialProducto= async (isAdministrator=false)=>{
    let databaseMaterialProducto = null;
    let apiMaterialProductoRaw = null;
    let apiMaterialProducto = null;
    let regMaterialeProducto = regMaterialeProductoUsuario;
    if (isAdministrator) regMaterialeProducto = regMaterialeProductoAdmin;
    databaseMaterialProducto = await Materiale.findAll(regMaterialeProducto);
    if (databaseMaterialProducto.length===0){
        apiMaterialProductoRaw = (await axios.get('http://192.168.18.15:82/materialesProductos')).data;
        apiMaterialProducto = await cleanArray(apiMaterialProductoRaw);
        await cargaBDMaterialProducto(apiMaterialProducto);
        databaseMaterialProducto = await Materiale.findAll(regMaterialeProducto);
    }
    return databaseMaterialProducto;
};

const createMaterialProducto = async (regMaterialProducto)=>{
    const transactionCrearMaterialProducto = await Materiale.sequelize.transaction();
    try {
        let maxIdMaterialProducto = await Materiale.max("id");
        let newMaterialProducto = await Materiale.create({id:maxIdMaterialProducto+1, ...regMaterialProducto},{transaction:transactionCrearMaterialProducto});
        await transactionCrearMaterialProducto.commit();
        console.log('Registro creado OK Tabla Materiale')
        return newMaterialProducto;
    } catch (error) {
        await transactionCrearMaterialProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteMaterialProducto = async (id)=>{
    const transactionEliminarMaterialProducto = await Materiale.sequelize.transaction();
    try {
        let foundMaterialProducto = await Materiale.findByPk(id);
        if (!foundMaterialProducto) throw new Error('ID de Material de Producto no encontrado');
        let foundProductos = await Producto.findAll({where:{MaterialeId:id, borradoLogico:false}});
        if (foundProductos.length>0) throw new Error('Material de Producto tiene productos asociados');
        let deletedMaterialProducto = await foundMaterialProducto.update({borradoLogico:!foundMaterialProducto.borradoLogico},{transaction:transactionEliminarMaterialProducto});
        await transactionEliminarMaterialProducto.commit();
        console.log('Registro eliminado OK Tabla Materiale Producto');
        return deletedMaterialProducto;
    } catch (error) {
        await transactionEliminarMaterialProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateMaterialProducto = async (id,regMaterialProducto)=>{
    const transactionActualizarMaterialProducto = await Materiale.sequelize.transaction();
    try {
        let foundMaterialProducto = await Materiale.findByPk(id);
        if (!foundMaterialProducto) throw new Error("ID de Material de Producto No existe");
        let updatedMaterialProducto = await foundMaterialProducto.update(regMaterialProducto,{transaction:transactionActualizarMaterialProducto});
        await transactionActualizarMaterialProducto.commit();
        console.log('Registro actualizado OK Tabla Materiale Producto');
        return updatedMaterialProducto;
    } catch (error) {
        await transactionActualizarMaterialProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllMaterialProducto,createMaterialProducto, deleteMaterialProducto, updateMaterialProducto};