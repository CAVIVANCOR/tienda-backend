const {Familia, SubFamilia} = require("../../db");
const axios = require("axios");
const regFamiliaProductoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regFamiliaProductoAdmin}=regFamiliaProductoUsuario;
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllFamiliaProducto= async (isAdministrator=false)=>{
    let databaseFamiliaProducto = null;
    let apiFamiliaProductoRaw = null;
    let apiFamiliaProducto = null;
    let regFamiliaProducto = regFamiliaProductoUsuario;
    if (isAdministrator) regFamiliaProducto = regFamiliaProductoAdmin;
    databaseFamiliaProducto = await Familia.findAll(regFamiliaProducto);
    if (databaseFamiliaProducto.length===0){
        apiFamiliaProductoRaw = (await axios.get('http://192.168.18.15:82/familiasProductos')).data;
        apiFamiliaProducto = await cleanArray(apiFamiliaProductoRaw);
        await cargaBDFamiliaProducto(apiFamiliaProducto);
        databaseFamiliaProducto = await Familia.findAll(regFamiliaProducto);
    }
    return databaseFamiliaProducto;
};

const createFamiliaProducto = async (regFamiliaProducto)=>{
    const transactionCrearFamiliaProducto = await Familia.sequelize.transaction();
    try {
        let maxIdFamiliaProducto = await Familia.max("id");
        let newFamiliaProducto = await Familia.create({id:maxIdFamiliaProducto+1, ...regFamiliaProducto},{transaction:transactionCrearFamiliaProducto});
        await transactionCrearFamiliaProducto.commit();
        console.log('Registro creado OK Tabla Familia')
        return newFamiliaProducto;
    } catch (error) {
        await transactionCrearFamiliaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteFamiliaProducto = async (id)=>{
    const transactionEliminarFamiliaProducto = await Familia.sequelize.transaction();
    try {
        let foundFamiliaProducto = await Familia.findByPk(id);
        if (!foundFamiliaProducto) throw new Error('El ID de Familia Producto No existe');
        let foundSubFamilias = await SubFamilia.findAll({where:{FamiliumId:id, borradoLogico:false}});
        if (foundSubFamilias.length>0) throw new Error('El ID de Familia Producto Tiene SubFamilias Asociadas');
        let deletedFamiliaProducto = await foundFamiliaProducto.update({borradoLogico:!foundFamiliaProducto.borradoLogico},{transaction:transactionEliminarFamiliaProducto});
        await transactionEliminarFamiliaProducto.commit();
        console.log('Registro eliminado OK Tabla Familia')
        return deletedFamiliaProducto;
    } catch (error) {
        await transactionEliminarFamiliaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateFamiliaProducto = async (id,regFamiliaProducto)=>{
    const transactionActualizarFamiliaProducto = await Familia.sequelize.transaction();
    try {
        let foundFamiliaProducto = await Familia.findByPk(id);
        if (!foundFamiliaProducto) throw new Error('El ID de Familia Producto No existe');
        let updatedFamiliaProducto = await foundFamiliaProducto.update(regFamiliaProducto,{transaction:transactionActualizarFamiliaProducto});
        await transactionActualizarFamiliaProducto.commit();
        console.log('Registro actualizado OK Tabla Familia')
        return updatedFamiliaProducto;
    } catch (error) {
        await transactionActualizarFamiliaProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchFamiliaProducto = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundFamiliaProducto = await Familia.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchFamiliaProducto:Registros encontrados en Tabla Familia",foundFamiliaProducto, foundFamiliaProducto.length);
        return foundFamiliaProducto;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllFamiliaProducto,createFamiliaProducto, deleteFamiliaProducto, updateFamiliaProducto, searchFamiliaProducto};