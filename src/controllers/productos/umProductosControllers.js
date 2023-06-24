const {UMProd,Producto} = require("../../db");
const axios = require("axios");
const regUMProdProductoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regUMProdProductoAdmin}=regUMProdProductoUsuario;
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllUMProducto= async (isAdministrator=false)=>{
    let databaseUMProducto = null;
    let apiUMProductoRaw = null;
    let apiUMProducto = null;
    let regUMProdProducto = regUMProdProductoUsuario;
    if (isAdministrator) regUMProdProducto = regUMProdProductoAdmin;
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
        let maxIdUMProducto = await UMProd.max("id");
        let newUMProducto = await UMProd.create({id:maxIdUMProducto+1, ...regUMProducto},{transaction:transactionCrearUMProducto});
        await transactionCrearUMProducto.commit();
        console.log('Registro creado OK Tabla UMProd')
        return newUMProducto;
    } catch (error) {
        await transactionCrearUMProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteUMProducto = async (id)=>{
    const transactionEliminarUMProducto = await UMProd.sequelize.transaction();
    try {
        let foundUMProducto = await UMProd.findByPk(id);
        if (!foundUMProducto) throw new Error('No existe el ID registro de UMProducto');
        let foundProductos = await Producto.findAll({where:{UMProdId:id,borradoLogico:false}});
        if (foundProductos.length>0) throw new Error('El registro de UMProducto tiene productos asociados');
        let deletedUMProducto = await foundUMProducto.update({borradoLogico:!foundUMProducto.borradoLogico},{transaction:transactionEliminarUMProducto});
        await transactionEliminarUMProducto.commit();
        console.log('Registro eliminado OK Tabla UMProd');
        return deletedUMProducto;
    } catch (error) {
        await transactionEliminarUMProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateUMProducto = async (id,regUMProducto)=>{
    const transactionActualizarUMProducto = await UMProd.sequelize.transaction();
    try {
        let foundUMProducto = await UMProd.findByPk(id);
        if (!foundUMProducto) throw new Error('No existe el ID registro de UMProducto');
        let updatedUMProducto = await foundUMProducto.update(regUMProducto,{transaction:transactionActualizarUMProducto});
        await transactionActualizarUMProducto.commit();
        console.log('Registro actualizado OK Tabla UMProd');
        return updatedUMProducto;
    } catch (error) {
        await transactionActualizarUMProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllUMProducto,createUMProducto,deleteUMProducto, updateUMProducto};