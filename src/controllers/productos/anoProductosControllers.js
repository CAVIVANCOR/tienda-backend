const {Ano,Producto} = require("../../db");
const axios = require("axios");
const regAnoUsuario ={
    where: { borradoLogico: false },
};
const {where,...regAnoAdmin}=regAnoUsuario;
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllAnoProducto= async (isAdministrator=false)=>{
    let databaseAnoProducto = null;
    let apiAnoProductoRaw = null;
    let apiAnoProducto = null;
    let regAno = regAnoUsuario;
    if (isAdministrator) regAno = regAnoAdmin;
    databaseAnoProducto = await Ano.findAll(regAno);
    if (databaseAnoProducto.length===0){
        apiAnoProductoRaw = (await axios.get('http://192.168.18.15:82/anosProductos')).data;
        apiAnoProducto = await cleanArray(apiAnoProductoRaw);
        await cargaBDAnoProducto(apiAnoProducto);
        databaseAnoProducto = await Ano.findAll(regAno);
    }
    return databaseAnoProducto;
};

const createAnoProducto = async (regAno)=>{
    const transactionCrearAnoProducto = await Ano.sequelize.transaction();
    try {
        let maxIdAno = await Ano.max("id");
        let newAno = await Ano.create({id:maxIdAno+1, ...regAno},{transaction:transactionCrearAnoProducto});
        await transactionCrearAnoProducto.commit();
        console.log('Registro creado OK Tabla Ano')
        return newAno;
    } catch (error) {
        await transactionCrearAnoProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteAnoProducto = async (id)=>{
    const transactionEliminarAno = await Ano.sequelize.transaction();
    try {
        let foundAno = await Ano.findByPk(id);
        if (!foundAno) throw new Error('ID Ano de producto No encontrado');
        let foundProductos = await Producto.findAll({where:{AnoId:id, borradoLogico:false}});
        if (foundProductos.length>0) throw new Error('Ano de producto tiene productos asociados');
        let deletedAnoProducto = await foundAno.update({borradoLogico:!foundAno.borradoLogico},{transaction:transactionEliminarAno});
        await transactionEliminarAno.commit();
        console.log('Registro eliminado OK Tabla Ano');
        return deletedAnoProducto;
    } catch (error) {
        await transactionEliminarAno.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateAnoProducto = async (id,regAno)=>{
    const transactionActualizarAno = await Ano.sequelize.transaction();
    try {
        let foundAno = await Ano.findByPk(id);
        if (!foundAno) throw new Error('ID Ano de producto No encontrado');
        let updatedAno = await foundAno.update(regAno,{transaction:transactionActualizarAno});
        await transactionActualizarAno.commit();
        console.log('Registro actualizado OK Tabla Ano');
        return updatedAno;
    } catch (error) {
        await transactionActualizarAno.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchAnoProducto = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundAnoProducto = await Ano.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchAnoProducto:Registros encontrados en Tabla AnoProducto",foundAnoProducto, foundAnoProducto.length);
        return foundAnoProducto;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllAnoProducto,createAnoProducto,deleteAnoProducto, updateAnoProducto, searchAnoProducto};