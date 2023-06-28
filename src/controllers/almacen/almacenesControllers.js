const {Almacen,Distrito, ConceptoAlmacen} = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");
const regAlmacenUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Distrito,
        attributes:["descripcion","codSunat"]
    }]
};
const {where,...regAlmacenAdmin}=regAlmacenUsuario;

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            kardex:elem.kardex,
            direccion:elem.direccion,
            DistritoId:elem.DistritoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Almacen.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllAlmacen= async (isAdministrator=false)=>{
    let databaseAlmacen = null;
    let apiAlmacenRaw = null;
    let apiAlmacen = null;
    let regAlmacen = regAlmacenUsuario;
    if (isAdministrator) regAlmacen = regAlmacenAdmin;
    databaseAlmacen = await Almacen.findAll(regAlmacen);
    if (databaseAlmacen.length===0){
        apiAlmacenRaw = (await axios.get('http://192.168.18.15:82/almacenes')).data;
        apiAlmacen = await cleanArray(apiAlmacenRaw);
        await cargaBDAlmacen(apiAlmacen);
        databaseAlmacen = await Almacen.findAll(regAlmacen);
    }
    return databaseAlmacen;
};

const createAlmacen = async (regAlmacen)=>{
    const transactionCrearAlmacen = await Almacen.sequelize.transaction();
    try {
        let maxIdAlmacen = await Almacen.max("id");
        let newAlmacen = await Almacen.create({id:maxIdAlmacen+1, ...regAlmacen},{transaction:transactionCrearAlmacen});
        await transactionCrearAlmacen.commit();
        console.log('Registro creado OK Tabla Almacen')
        return newAlmacen;
    } catch (error) {
        await transactionCrearAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteAlmacen = async (id) => {
    let transactionEliminarAlmacen = await Almacen.sequelize.transaction();
    try {
            const foundAlmacen = await Almacen.findByPk(id);
            if (!foundAlmacen) {
                throw new Error('No se ha encontrado la entrada de Almacen');
            }
            let foundConceptoAlmacen = await ConceptoAlmacen.findAll({
                where: {
                    [Op.or]: [
                        { codAlmacenOrigen: id },
                        { codAlmacenDestino: id }
                    ],
                    borradoLogico: false}
                }
            );
            if (foundConceptoAlmacen.length>0) throw new Error('No se puede marcar como borrado el Almacen porque hay ConceptoAlmacen que lo referencian');
            let deletedAlmacen = await foundAlmacen.update({borradoLogico:!foundAlmacen.borradoLogico},{transaction:transactionEliminarAlmacen});
            await transactionEliminarAlmacen.commit();
            console.log("Registro eliminado OK Tabla Almacen");
            return deletedAlmacen;
    } catch (error) {
        await transactionEliminarAlmacen.rollback();
        console.error(error);
        throw new Error(error.message);
    }
};

const updateAlmacen = async (id,regAlmacen)=>{
    let transactionActualizarAlmacen = await Almacen.sequelize.transaction();
    try {
        const foundAlmacen = await Almacen.findByPk(id);
        if (!foundAlmacen) {
            throw new Error('No se ha encontrado la entrada de Almacen');
        }
        let updatedAlmacen = await foundAlmacen.update(regAlmacen,{transaction:transactionActualizarAlmacen});
        await transactionActualizarAlmacen.commit();
        console.log("Registro actualizado OK Tabla Almacen");
        return updatedAlmacen;
    } catch (error) {
        await transactionActualizarAlmacen.rollback();
        console.error(error);
        throw new Error(error.message);
    }
}

const searchByAlmacen = async (search) => {
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsAlmacen = await Almacen.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchByAlmacen:Registros encontrados en Tabla Almacen",foundRegsAlmacen, foundRegsAlmacen.length);
        return foundRegsAlmacen;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

};


module.exports = {getAllAlmacen, createAlmacen, deleteAlmacen, updateAlmacen, searchByAlmacen};