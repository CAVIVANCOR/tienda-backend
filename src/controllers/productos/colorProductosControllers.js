const {Colore} = require("../../db");
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

const cargaBDColorProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Colore.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllColorProducto= async ()=>{
    let databaseColorProducto = null;
    let apiColorProductoRaw = null;
    let apiColorProducto = null;
    databaseColorProducto = await Colore.findAll();
    if (databaseColorProducto.length===0){
        apiColorProductoRaw = (await axios.get('http://192.168.18.15:82/colorProductos')).data;
        apiColorProducto = await cleanArray(apiColorProductoRaw);
        await cargaBDColorProducto(apiColorProducto);
        databaseColorProducto = await Colore.findAll();
    }
    return databaseColorProducto;
};

const createColorProducto = async (regColorProducto)=>{
    const transactionCrearColorProducto = await Colore.sequelize.transaction();
    try {
        let maxIdColorProducto = await Colore.max("id", {transaction:transactionCrearColorProducto});
        let newColorProducto = await Colore.create({id:maxIdColorProducto+1, ...regColorProducto},{transaction:transactionCrearColorProducto});
        await transactionCrearColorProducto.commit();
        console.log('Registro creado OK Tabla Colore')
        return newColorProducto;
    } catch (error) {
        await transactionCrearColorProducto.rollback();
        console.log(error.message);
    };
};
module.exports = {getAllColorProducto,createColorProducto};