const {Procedencia} = require("../../db");
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

const cargaBDProcedenciaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Procedencia.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllProcedenciaProducto= async ()=>{
    let databaseProcedenciaProducto = null;
    let apiProcedenciaProductoRaw = null;
    let apiProcedenciaProducto = null;
    databaseProcedenciaProducto = await Procedencia.findAll();
    if (databaseProcedenciaProducto.length===0){
        apiProcedenciaProductoRaw = (await axios.get('http://192.168.18.15:82/procedenciasProductos')).data;
        apiProcedenciaProducto = await cleanArray(apiProcedenciaProductoRaw);
        await cargaBDProcedenciaProducto(apiProcedenciaProducto);
        databaseProcedenciaProducto = await Procedencia.findAll();
    }
    return databaseProcedenciaProducto;
};

const createProcedenciaProducto = async (regProcedenciaProducto)=>{
    const transactionCrearProcedenciaProducto = await Procedencia.sequelize.transaction();
    try {
        let maxIdProcedenciaProducto = await Procedencia.max("id", {transaction:transactionCrearProcedenciaProducto});
        let newProcedenciaProducto = await Procedencia.create({id:maxIdProcedenciaProducto+1, ...regProcedenciaProducto},{transaction:transactionCrearProcedenciaProducto});
        await transactionCrearProcedenciaProducto.commit();
        console.log('Registro creado OK Tabla Procedencia')
        return newProcedenciaProducto;
    } catch (error) {
        await transactionCrearProcedenciaProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllProcedenciaProducto,createProcedenciaProducto};