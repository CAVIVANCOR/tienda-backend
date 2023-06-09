const {Materiale} = require("../../db");
const axios = require("axios");

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
        console.log(error.message)
    }
};

const getAllMaterialProducto= async ()=>{
    let databaseMaterialProducto = null;
    let apiMaterialProductoRaw = null;
    let apiMaterialProducto = null;
    databaseMaterialProducto = await Materiale.findAll();
    if (databaseMaterialProducto.length===0){
        apiMaterialProductoRaw = (await axios.get('http://192.168.18.15:82/materialesProductos')).data;
        apiMaterialProducto = await cleanArray(apiMaterialProductoRaw);
        await cargaBDMaterialProducto(apiMaterialProducto);
        databaseMaterialProducto = await Materiale.findAll();
    }
    return databaseMaterialProducto;
};

const createMaterialProducto = async (regMaterialProducto)=>{
    const transactionCrearMaterialProducto = await Materiale.sequelize.transaction();
    try {
        let maxIdMaterialProducto = await Materiale.max("id", {transaction:transactionCrearMaterialProducto});
        let newMaterialProducto = await Materiale.create({id:maxIdMaterialProducto+1, ...regMaterialProducto},{transaction:transactionCrearMaterialProducto});
        await transactionCrearMaterialProducto.commit();
        console.log('Registro creado OK Tabla Materiale')
        return newMaterialProducto;
    } catch (error) {
        await transactionCrearMaterialProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllMaterialProducto,createMaterialProducto};