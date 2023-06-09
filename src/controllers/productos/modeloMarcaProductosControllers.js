const {ModeloMarca, Marca} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            MarcaId:elem.MarcaProductoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDModeloMarcaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await ModeloMarca.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllModeloMarcaProducto= async ()=>{
    let databaseModeloMarcaProducto = null;
    let apiModeloMarcaProductoRaw = null;
    let apiModeloMarcaProducto = null;
    databaseModeloMarcaProducto = await ModeloMarca.findAll({
        include:[{
            model:Marca,
            attributes:["descripcion","urlLogoMarca"]
        }]
    });
    if (databaseModeloMarcaProducto.length===0){
        apiModeloMarcaProductoRaw = (await axios.get('http://192.168.18.15:82/modelosMarcasProductos')).data;
        apiModeloMarcaProducto = await cleanArray(apiModeloMarcaProductoRaw);
        await cargaBDModeloMarcaProducto(apiModeloMarcaProducto);
        databaseModeloMarcaProducto = await ModeloMarca.findAll({
            include:[{
                model:Marca,
                attributes:["descripcion","urlLogoMarca"]
            }]
        });
    }
    return databaseModeloMarcaProducto;
};

const createModeloMarcaProducto = async (regModeloMarcaProducto)=>{
    const transactionCrearModeloMarcaProducto = await ModeloMarca.sequelize.transaction();
    try {
        let maxIdModeloMarcaProducto = await ModeloMarca.max("id", {transaction:transactionCrearModeloMarcaProducto});
        let newModeloMarcaProducto = await ModeloMarca.create({id:maxIdModeloMarcaProducto+1, ...regModeloMarcaProducto},{transaction:transactionCrearModeloMarcaProducto});
        await transactionCrearModeloMarcaProducto.commit();
        console.log('Registro creado OK Tabla ModeloMarca')
        return newModeloMarcaProducto;
    } catch (error) {
        await transactionCrearModeloMarcaProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllModeloMarcaProducto,createModeloMarcaProducto};