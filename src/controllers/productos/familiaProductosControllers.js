const {Familia} = require("../../db");
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

const cargaBDFamiliaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Familia.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllFamiliaProducto= async ()=>{
    let databaseFamiliaProducto = null;
    let apiFamiliaProductoRaw = null;
    let apiFamiliaProducto = null;
    databaseFamiliaProducto = await Familia.findAll();
    if (databaseFamiliaProducto.length===0){
        apiFamiliaProductoRaw = (await axios.get('http://192.168.18.15:82/familiasProductos')).data;
        apiFamiliaProducto = await cleanArray(apiFamiliaProductoRaw);
        await cargaBDFamiliaProducto(apiFamiliaProducto);
        databaseFamiliaProducto = await Familia.findAll();
    }
    return databaseFamiliaProducto;
};

const createFamiliaProducto = async (regFamiliaProducto)=>{
    const transactionCrearFamiliaProducto = await Familia.sequelize.transaction();
    try {
        let maxIdFamiliaProducto = await Familia.max("id", {transaction:transactionCrearFamiliaProducto});
        let newFamiliaProducto = await Familia.create({id:maxIdFamiliaProducto+1, ...regFamiliaProducto},{transaction:transactionCrearFamiliaProducto});
        await transactionCrearFamiliaProducto.commit();
        console.log('Registro creado OK Tabla Familia')
        return newFamiliaProducto;
    } catch (error) {
        await transactionCrearFamiliaProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllFamiliaProducto,createFamiliaProducto};