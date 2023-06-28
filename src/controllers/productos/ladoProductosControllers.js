const {Lado, Producto} = require("../../db");
const axios = require("axios");
const regLadoProductoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regLadoProductoAdmin}=regLadoProductoUsuario;
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

const cargaBDLadoProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Lado.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllLadoProducto= async (isAdministrator=false)=>{
    let databaseLadoProducto = null;
    let apiLadoProductoRaw = null;
    let apiLadoProducto = null;
    let regLadoProducto = regLadoProductoUsuario;
    if (isAdministrator) regLadoProducto = regLadoProductoAdmin;
    databaseLadoProducto = await Lado.findAll(regLadoProducto);
    if (databaseLadoProducto.length===0){
        apiLadoProductoRaw = (await axios.get('http://192.168.18.15:82/ladosProductos')).data;
        apiLadoProducto = await cleanArray(apiLadoProductoRaw);
        await cargaBDLadoProducto(apiLadoProducto);
        databaseLadoProducto = await Lado.findAll(regLadoProducto);
    }
    return databaseLadoProducto;
};

const createLadoProducto = async (regLadoProducto)=>{
    const transactionCrearLadoProducto = await Lado.sequelize.transaction();
    try {
        let maxIdLadoProducto = await Lado.max("id");
        let newLadoProducto = await Lado.create({id:maxIdLadoProducto+1, ...regLadoProducto},{transaction:transactionCrearLadoProducto});
        await transactionCrearLadoProducto.commit();
        console.log('Registro creado OK Tabla Lado')
        return newLadoProducto;
    } catch (error) {
        await transactionCrearLadoProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteLadoProducto = async (id)=>{
    const transactionEliminarLadoProducto = await Lado.sequelize.transaction();
    try {
        let foundLadoProducto = await Lado.findByPk(id);
        if (!foundLadoProducto) throw new Error("ID de Lado del producto no encontrado");
        let foundProductos = await Producto.findAll({where:{LadoId:id, borradoLogico:false}});
        if (foundProductos.length>0) throw new Error("El Lado tiene productos asociados");
        let deletedLadoProducto = await foundLadoProducto.update({borradoLogico:!foundLadoProducto.borradoLogico},{transaction:transactionEliminarLadoProducto});
        await transactionEliminarLadoProducto.commit();
        console.log('Registro eliminado OK Tabla Lado');
        return deletedLadoProducto;
    } catch (error) {
        await transactionEliminarLadoProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateLadoProducto = async (id,regLadoProducto)=>{
    const transactionActualizarLadoProducto = await Lado.sequelize.transaction();
    try {
        let foundLadoProducto = await Lado.findByPk(id);
        if (!foundLadoProducto) throw new Error("ID de Lado del producto no encontrado");
        let updatedLadoProducto = await foundLadoProducto.update(regLadoProducto,{transaction:transactionActualizarLadoProducto});
        await transactionActualizarLadoProducto.commit();
        console.log('Registro actualizado OK Tabla Lado');
        return updatedLadoProducto;
    } catch (error) {
        await transactionActualizarLadoProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchLadoProducto = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundLadoProducto = await Lado.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchLadoProducto:Registros encontrados en Tabla Lado",foundLadoProducto, foundLadoProducto.length);
        return foundLadoProducto;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllLadoProducto,createLadoProducto,deleteLadoProducto, updateLadoProducto, searchLadoProducto};