const {Provincia, Departamento, Pais,Distrito} = require("../../db");
const axios = require("axios");
const regProvinciaUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Departamento,
        attributes:["descripcion","codSunat"],
        include:[{
            model:Pais,
            attributes:["descripcion","codSunat"]
        }]
    }]
};
const {where,...regProvinciaAdmin}=regProvinciaUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            origen:elem.origen,
            DepartamentoId:elem.idDepartamento,
        };
    });
    return clean;
};

const cargaBDProvincia = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Provincia.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllProvincia= async (isAdministrator=false)=>{
    let databaseProvincias = null;
    let apiProvinciasRaw = null;
    let apiProvincias = null;
    let regProvincia = regProvinciaUsuario;
    if (isAdministrator) regProvincia = regProvinciaAdmin;
    databaseProvincias = await Provincia.findAll(regProvincia);
    if (databaseProvincias.length===0){
        apiProvinciasRaw = (await axios.get('http://192.168.18.15:82/provincias')).data;
        apiProvincias = await cleanArray(apiProvinciasRaw);
        await cargaBDProvincia(apiProvincias);
        databaseProvincias = await Provincia.findAll(regProvincia);
    }
    return databaseProvincias;
};

const createProvicias = async (regProvincias)=>{
    const transactionCrearProvincias = await Provincia.sequelize.transaction();
    try {
        //await Provincia.sequelize.query('Lock Table Provincia',{transaction:transactionCrearProvincias});
        let maxIdProvincia = await Provincia.max('id');
        let newProvincia = await Provincia.create({id:maxIdProvincia+1, ...regProvincias},{transaction:transactionCrearProvincias});
        await transactionCrearProvincias.commit();
        console.log('Registro creado OK Tabla Provincia')
        return newProvincia;
    } catch (error) {
        await transactionCrearProvincias.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteProvincias = async (id)=>{
    const transactionEliminarProvincias = await Provincia.sequelize.transaction();
    try {
        let foundProvincia = await Provincia.findByPk(id);
        if (!foundProvincia) throw new Error('ID de Provincia no encontrada');
        let foundDistrito = await Distrito.findAll({where:{ProvinciumId:id, borradoLogico:false}});
        if (foundDistrito.length>0) throw new Error('No se puede eliminar porque tiene distritos asociados');
        let deletedProvincias = await foundProvincia.update({borradoLogico:!foundProvincia.borradoLogico},{transaction:transactionEliminarProvincias});
        await transactionEliminarProvincias.commit();
        console.log('Registro eliminado OK Tabla Provincia');
        return deletedProvincias;
    } catch (error) {
        await transactionEliminarProvincias.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllProvincia, createProvicias, deleteProvincias};