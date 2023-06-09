const {Lado} = require("../../db");
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

const cargaBDLadoProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Lado.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllLadoProducto= async ()=>{
    let databaseLadoProducto = null;
    let apiLadoProductoRaw = null;
    let apiLadoProducto = null;
    databaseLadoProducto = await Lado.findAll();
    if (databaseLadoProducto.length===0){
        apiLadoProductoRaw = (await axios.get('http://192.168.18.15:82/ladosProductos')).data;
        apiLadoProducto = await cleanArray(apiLadoProductoRaw);
        await cargaBDLadoProducto(apiLadoProducto);
        databaseLadoProducto = await Lado.findAll();
    }
    return databaseLadoProducto;
};

const createLadoProducto = async (regLadoProducto)=>{
    const transactionCrearLadoProducto = await Lado.sequelize.transaction();
    try {
        let maxIdLadoProducto = await Lado.max("id", {transaction:transactionCrearLadoProducto});
        let newLadoProducto = await Lado.create({id:maxIdLadoProducto+1, ...regLadoProducto},{transaction:transactionCrearLadoProducto});
        await transactionCrearLadoProducto.commit();
        console.log('Registro creado OK Tabla Lado')
        return newLadoProducto;
    } catch (error) {
        await transactionCrearLadoProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllLadoProducto,createLadoProducto};