const {SubFamilia,Familia,Producto} = require("../../db");
const axios = require("axios");
const regSubFamiliaProductoUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Familia,
        attributes:["descripcion","noKardex"]
    }]
};
const {where,...regSubFamiliaProductoAdmin}=regSubFamiliaProductoUsuario;
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllSubFamiliaProducto= async (isAdministrator=false)=>{
    let databaseSubFamiliaProducto = null;
    let apiSubFamiliaProductoRaw = null;
    let apiSubFamiliaProducto = null;
    let regSubFamiliaProducto = regSubFamiliaProductoUsuario;
    if (isAdministrator) regSubFamiliaProducto = regSubFamiliaProductoAdmin;
    databaseSubFamiliaProducto = await SubFamilia.findAll(regSubFamiliaProducto);
    if (databaseSubFamiliaProducto.length===0){
        apiSubFamiliaProductoRaw = (await axios.get('http://192.168.18.15:82/subFamiliasProductos')).data;
        apiSubFamiliaProducto = await cleanArray(apiSubFamiliaProductoRaw);
        await cargaBDSubFamiliaProducto(apiSubFamiliaProducto);
        databaseSubFamiliaProducto = await SubFamilia.findAll(regSubFamiliaProducto);
    }
    return databaseSubFamiliaProducto;
};

const createSubFamiliaProducto = async (regSubFamiliaProducto)=>{
    const transactionCrearSubFamiliaProducto = await SubFamilia.sequelize.transaction();
    try {
        let maxIdSubFamiliaProducto = await SubFamilia.max("id");
        let newSubFamiliaProducto = await SubFamilia.create({id:maxIdSubFamiliaProducto+1, ...regSubFamiliaProducto},{transaction:transactionCrearSubFamiliaProducto});
        await transactionCrearSubFamiliaProducto.commit();
        console.log('Registro creado OK Tabla SubFamilia');
        return newSubFamiliaProducto;
    } catch (error) {
        await transactionCrearSubFamiliaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteSubFamiliaProducto = async (id)=>{
    const transactionEliminarSubFamiliaProducto = await SubFamilia.sequelize.transaction();
    try {
        let foundSubFamiliaProducto = await SubFamilia.findByPk(id);
        if (!foundSubFamiliaProducto) throw new Error('ID de Registro SubFamilia de producto no encontrado');
        let foundProductos = await Producto.findAll({where:{SubFamiliumId:id,borradoLogico:false}});
        if (foundProductos.length>0) throw new Error('No se puede eliminar el registro ya que tiene productos asociados');
        let deletedSubFamiliaProducto = await foundSubFamiliaProducto.update({borradoLogico:!foundSubFamiliaProducto.borradoLogico},{transaction:transactionEliminarSubFamiliaProducto});
        await transactionEliminarSubFamiliaProducto.commit();
        console.log('Registro SubFamiliaProducto eliminado OK');
        return deletedSubFamiliaProducto;
    } catch (error) {
        await transactionEliminarSubFamiliaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateSubFamiliaProducto = async (id,regSubFamiliaProducto)=>{
    const transactionActualizarSubFamiliaProducto = await SubFamilia.sequelize.transaction();
    try {
        let foundSubFamiliaProducto = await SubFamilia.findByPk(id);
        if (!foundSubFamiliaProducto) throw new Error('ID de Registro SubFamilia de producto no encontrado');
        let updatedSubFamiliaProducto = await foundSubFamiliaProducto.update(regSubFamiliaProducto,{transaction:transactionActualizarSubFamiliaProducto});
        await transactionActualizarSubFamiliaProducto.commit();
        console.log('Registro SubFamiliaProducto actualizado OK');
        return updatedSubFamiliaProducto;
    } catch (error) {
        await transactionActualizarSubFamiliaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllSubFamiliaProducto,createSubFamiliaProducto,deleteSubFamiliaProducto, updateSubFamiliaProducto};