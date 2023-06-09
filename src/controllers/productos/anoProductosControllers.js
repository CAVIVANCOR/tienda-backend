const {Ano} = require("../../db");
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

const cargaBDAnoProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Ano.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllAnoProducto= async ()=>{
    let databaseAnoProducto = null;
    let apiAnoProductoRaw = null;
    let apiAnoProducto = null;
    databaseAnoProducto = await Ano.findAll();
    if (databaseAnoProducto.length===0){
        apiAnoProductoRaw = (await axios.get('http://192.168.18.15:82/anosProductos')).data;
        apiAnoProducto = await cleanArray(apiAnoProductoRaw);
        await cargaBDAnoProducto(apiAnoProducto);
        databaseAnoProducto = await Ano.findAll();
    }
    return databaseAnoProducto;
};

const createAnoProducto = async (regAno)=>{
    const transactionCrearAnoProducto = await Ano.sequelize.transaction();
    try {
        let maxIdAno = await Ano.max("id", {transaction:transactionCrearAnoProducto});
        let newAno = await Ano.create({id:maxIdAno+1, ...regAno},{transaction:transactionCrearAnoProducto});
        await transactionCrearAnoProducto.commit();
        console.log('Registro creado OK Tabla Ano')
        return newAno;
    } catch (error) {
        await transactionCrearAnoProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllAnoProducto,createAnoProducto};