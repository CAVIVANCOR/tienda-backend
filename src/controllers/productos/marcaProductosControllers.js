const {Marca} = require("../../db");
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

const cargaBDMarcaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Marca.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllMarcaProducto= async ()=>{
    let databaseMarcaProducto = null;
    let apiMarcaProductoRaw = null;
    let apiMarcaProducto = null;
    databaseMarcaProducto = await Marca.findAll();
    if (databaseMarcaProducto.length===0){
        apiMarcaProductoRaw = (await axios.get('http://192.168.18.15:82/marcasProductos')).data;
        apiMarcaProducto = await cleanArray(apiMarcaProductoRaw);
        await cargaBDMarcaProducto(apiMarcaProducto);
        databaseMarcaProducto = await Marca.findAll();
    }
    return databaseMarcaProducto;
};

const createMarcaProducto = async (regMarcaProducto)=>{
    const transactionCrearMarcaProducto = await Marca.sequelize.transaction();
    try {
        let maxIdMarcaProducto = await Marca.max("id", {transaction:transactionCrearMarcaProducto});
        let newMarcaProducto = await Marca.create({id:maxIdMarcaProducto+1, ...regMarcaProducto},{transaction:transactionCrearMarcaProducto});
        await transactionCrearMarcaProducto.commit();
        console.log('Registro creado OK Tabla Marca')
        return newMarcaProducto;
    } catch (error) {
        await transactionCrearMarcaProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllMarcaProducto,createMarcaProducto};
