const {UMProd} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            conversion:elem.conversion,
            abreviacion:elem.abreviacion,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDUMProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await UMProd.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllUMProducto= async ()=>{
    let databaseUMProducto = null;
    let apiUMProductoRaw = null;
    let apiUMProducto = null;
    databaseUMProducto = await UMProd.findAll();
    if (databaseUMProducto.length===0){
        apiUMProductoRaw = (await axios.get('http://192.168.18.15:82/umProductos')).data;
        apiUMProducto = await cleanArray(apiUMProductoRaw);
        await cargaBDUMProducto(apiUMProducto);
        databaseUMProducto = await UMProd.findAll();
    }
    return databaseUMProducto;
};

const createUMProducto = async (regUMProducto)=>{
    const transactionCrearUMProducto = await UMProd.sequelize.transaction();
    try {
        let maxIdUMProducto = await UMProd.max("id", {transaction:transactionCrearUMProducto});
        let newUMProducto = await UMProd.create({id:maxIdUMProducto+1, ...regUMProducto},{transaction:transactionCrearUMProducto});
        await transactionCrearUMProducto.commit();
        console.log('Registro creado OK Tabla UMProd')
        return newUMProducto;
    } catch (error) {
        await transactionCrearUMProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllUMProducto,createUMProducto};