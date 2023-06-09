const {EstadoProd} = require("../../db");
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

const cargaBDEstadoProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await EstadoProd.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllEstadoProducto= async ()=>{
    let databaseEstadoProducto = null;
    let apiEstadoProductoRaw = null;
    let apiEstadoProducto = null;
    databaseEstadoProducto = await EstadoProd.findAll();
    if (databaseEstadoProducto.length===0){
        apiEstadoProductoRaw = (await axios.get('http://192.168.18.15:82/estadosProductos')).data;
        apiEstadoProducto = await cleanArray(apiEstadoProductoRaw);
        await cargaBDEstadoProducto(apiEstadoProducto);
        databaseEstadoProducto = await EstadoProd.findAll();
    }
    return databaseEstadoProducto;
};

const createEstadoProducto = async (regEstadoProducto)=>{
    const transactionCrearEstadoProducto = await EstadoProd.sequelize.transaction();
    try {
        let maxIdEstadoProducto = await EstadoProd.max("id", {transaction:transactionCrearEstadoProducto});
        let newEstadoProducto = await EstadoProd.create({id:maxIdEstadoProducto+1, ...regEstadoProducto},{transaction:transactionCrearEstadoProducto});
        await transactionCrearEstadoProducto.commit();
        console.log('Registro creado OK Tabla EstadoProd')
        return newEstadoProducto;
    } catch (error) {
        await transactionCrearEstadoProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllEstadoProducto,createEstadoProducto};
