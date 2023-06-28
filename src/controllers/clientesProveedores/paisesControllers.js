const {Pais,Departamento} = require("../../db");
const axios = require("axios");
const regPaisUsuario ={
    where: { borradoLogico: false },
};
const {where,...regPaisAdmin}=regPaisUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            origen:elem.origen,
        };
    });
    return clean;
};

const cargaBDPais = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Pais.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllPais= async (isAdministrator=false)=>{
    let databasePais = null;
    let apiPaisRaw = null;
    let apiPais = null;
    let regPais = regPaisUsuario;
    if (isAdministrator) regPais = regPaisAdmin;
    databasePais = await Pais.findAll(regPais);
    if (databasePais.length===0){
        apiPaisRaw = (await axios.get('http://192.168.18.15:82/paises')).data;
        apiPais = await cleanArray(apiPaisRaw);
        await cargaBDPais(apiPais);
        databasePais = await Pais.findAll(regPais);
    }
    return databasePais;
};

const createPais = async (regPais)=>{
    const transactionCrearPais = await Pais.sequelize.transaction();
    try {
        //await Pais.sequelize.query('Lock Table Pais',{transaction:transactionCrearPais});
        let maxIdPais = await Pais.max('id');
        let newPais = await Pais.create({id:maxIdPais+1, ...regPais},{transaction:transactionCrearPais});
        await transactionCrearPais.commit();
        console.log('Registro creado OK Tabla Pais')
        return newPais;
    } catch (error) {
        await transactionCrearPais.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deletePais = async (id)=>{
    const transactionEliminarPais = await Pais.sequelize.transaction();
    try {
        let foundPais = await Pais.findByPk(id);
        if (!foundPais) throw new Error('ID Pais no encontrado');
        let foundDepartamento = await Departamento.findAll({where:{PaiId:id,borradoLogico:false}});
        if (foundDepartamento.length>0) throw new Error('El pais tiene departamentos asociados');
        let deletedPais = await foundPais.update({borradoLogico:!foundPais.borradoLogico},{transaction:transactionEliminarPais});
        await transactionEliminarPais.commit();
        console.log('Registro borrado OK Tabla Pais')
        return deletedPais;
    } catch (error) {
        await transactionEliminarPais.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updatePais = async (id,regPais)=>{
    const transactionActualizarPais = await Pais.sequelize.transaction();
    try {
        let foundPais = await Pais.findByPk(id);
        if (!foundPais) throw new Error('ID Pais no encontrado');
        let updatedPais = await foundPais.update(regPais,{transaction:transactionActualizarPais});
        await transactionActualizarPais.commit();
        return updatedPais;
    } catch (error) {
        await transactionActualizarPais.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchPaises = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsPais = await Pais.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchPaises:Registros encontrados en Tabla Pais",foundRegsPais, foundRegsPais.length);
        return foundRegsPais;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};


module.exports = {getAllPais,createPais,deletePais, updatePais, searchPaises};
