const {Distrito,Provincia,Departamento,Pais,DirCliProv} = require("../../db");
const axios = require("axios");
const regDistritoUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Provincia,
        attributes:["descripcion","codSunat"],
        include:[{
            model:Departamento,
            attributes:["descripcion","codSunat"],
            include:[{
                model:Pais,
                attributes:["descripcion","codSunat"],
            }]
        }]
    }]
};
const {where,...regDistritoAdmin}=regDistritoUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            codPostal:elem.codPostal,
            origen:elem.origen,
            ProvinciumId:elem.idProvincia,
        };
    });
    return clean;
};

const cargaBDDistrito = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Distrito.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllDistrito= async (isAdministrator=false)=>{
    let databaseDistritos = null;
    let apiDistritosRaw = null;
    let apiDistritos = null;
    let regDistrito = regDistritoUsuario;
    if (isAdministrator) regDistrito = regDistritoAdmin;
    databaseDistritos = await Distrito.findAll(regDistrito);
    if (databaseDistritos.length===0){
        apiDistritosRaw = (await axios.get('http://192.168.18.15:82/distritos')).data;
        apiDistritos = await cleanArray(apiDistritosRaw);
        await cargaBDDistrito(apiDistritos);
        databaseDistritos = await Distrito.findAll(regDistrito);
    }
    return databaseDistritos;
};

const createDistrito = async (regDistrito)=>{
    const transactionCrearDistrito = await Distrito.sequelize.transaction();
    try {
       // await Distrito.sequelize.query('Lock Table Distrito',{transaction:transactionCrearDistrito});
        let maxIdDistrito = await Distrito.max('id');
        let newDistrito = await Distrito.create({id:maxIdDistrito+1, ...regDistrito},{transaction:transactionCrearDistrito});
        await transactionCrearDistrito.commit();
        console.log('Registro creado OK Tabla Distrito')
        return newDistrito;
    } catch (error) {
        await transactionCrearDistrito.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteDistrito = async (id)=>{
    const transactionBorrarDistrito = await Distrito.sequelize.transaction();
    try {
        let foundDistrito = await Distrito.findByPk(id);
        if (!foundDistrito) throw new Error("ID Distrito no encontrado");
        let foundDirCliProv = await DirCliProv.findAll({where:{DistritoId:id,borradoLogico:false}});
        if (foundDirCliProv.length>0) throw new Error("Distrito tiene clientes asociados");
        let deletedDistrito = await foundDistrito.update({borradoLogico:!foundDistrito.borradoLogico},{transaction:transactionBorrarDistrito});
        await transactionBorrarDistrito.commit();
        console.log("Registro borrado OK Tabla Distrito");
        return deletedDistrito;
    } catch (error) {
        await transactionBorrarDistrito.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateDistrito = async (id,regDistrito)=>{
    const transactionActualizarDistrito = await Distrito.sequelize.transaction();
    try {
        let foundDistrito = await Distrito.findByPk(id);
        if (!foundDistrito) throw new Error("ID Distrito no encontrado");
        let updatedDistrito = await foundDistrito.update(regDistrito,{transaction:transactionActualizarDistrito});
        await transactionActualizarDistrito.commit();
        console.log("Registro actualizado OK Tabla Distrito");
        return updatedDistrito;
    } catch (error) {
        await transactionActualizarDistrito.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchDistritos = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsDistrito = await Distrito.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchDistritos:Registros encontrados en Tabla Distrito",foundRegsDistrito, foundRegsDistrito.length);
        return foundRegsDistrito;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllDistrito,createDistrito,deleteDistrito, updateDistrito, searchDistritos};
