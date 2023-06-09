const {SubFamilia,Familia} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            noKardex:elem.noKardex,
            FamiliumId:elem.FamiliaProductoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDSubFamiliaProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await SubFamilia.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllSubFamiliaProducto= async ()=>{
    let databaseSubFamiliaProducto = null;
    let apiSubFamiliaProductoRaw = null;
    let apiSubFamiliaProducto = null;
    databaseSubFamiliaProducto = await SubFamilia.findAll({
        include:[{
            model:Familia,
            attributes:["descripcion","noKardex"]
        }]
    });
    if (databaseSubFamiliaProducto.length===0){
        apiSubFamiliaProductoRaw = (await axios.get('http://192.168.18.15:82/subFamiliasProductos')).data;
        apiSubFamiliaProducto = await cleanArray(apiSubFamiliaProductoRaw);
        await cargaBDSubFamiliaProducto(apiSubFamiliaProducto);
        databaseSubFamiliaProducto = await SubFamilia.findAll({
            include:[{
                model:Familia,
                attributes:["descripcion","noKardex"]
            }]
        });
    }
    return databaseSubFamiliaProducto;
};

const createSubFamiliaProducto = async (regSubFamiliaProducto)=>{
    const transactionCrearSubFamiliaProducto = await SubFamilia.sequelize.transaction();
    try {
        let maxIdSubFamiliaProducto = await SubFamilia.max("id", {transaction:transactionCrearSubFamiliaProducto});
        let newSubFamiliaProducto = await SubFamilia.create({id:maxIdSubFamiliaProducto+1, ...regSubFamiliaProducto},{transaction:transactionCrearSubFamiliaProducto});
        await transactionCrearSubFamiliaProducto.commit();
        console.log('Registro creado OK Tabla SubFamilia');
        return newSubFamiliaProducto;
    } catch (error) {
        await transactionCrearSubFamiliaProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllSubFamiliaProducto,createSubFamiliaProducto};