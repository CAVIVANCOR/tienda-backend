const {Departamento,Pais,Provincia} = require("../../db");
const axios = require("axios");
const regDepartamentoUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Pais,
        attributes:["descripcion","codSunat"]
    }]
};
const {where,...regDepartamentoAdmin}=regDepartamentoUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            origen:elem.origen,
            PaiId:elem.idPais,
        };
    });
    return clean;
};

const cargaBDDepartamento = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Departamento.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllDepartamento= async (isAdministrator=false)=>{
    let databaseDepartamentos = null;
    let apiDepartamentosRaw = null;
    let apiDepartamentos = null;
    let regDepartamento = regDepartamentoUsuario;
    if (isAdministrator) regDepartamento = regDepartamentoAdmin;
    databaseDepartamentos = await Departamento.findAll(regDepartamento);
    if (databaseDepartamentos.length===0){
        apiDepartamentosRaw = (await axios.get('http://192.168.18.15:82/departamentos')).data;
        apiDepartamentos = await cleanArray(apiDepartamentosRaw);
        await cargaBDDepartamento(apiDepartamentos);
        databaseDepartamentos = await Departamento.findAll(regDepartamento);
    }
    return databaseDepartamentos;
};

const createDepartamento = async (regDepartamento)=>{
    const transactionCrearDepartamento = await Departamento.sequelize.transaction();
    try {
        //await Departamento.sequelize.query('Lock Table Departamento',{transaction:transactionCrearDepartamento});
        let maxIdDepartamento = await Departamento.max('id');
        let newDepartamento = await Departamento.create({id:maxIdDepartamento+1, ...regDepartamento},{transaction:transactionCrearDepartamento});
        await transactionCrearDepartamento.commit();
        console.log('Registro creado OK Tabla Departamento')
        return newDepartamento;
    } catch (error) {
        await transactionCrearDepartamento.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteDepartamento = async (id)=>{
    let transactionEliminarDepartamento = await Departamento.sequelize.transaction();
    try {
        let foundDepartamento = await Departamento.findByPk(id);
        if (!foundDepartamento) throw new Error('ID Departamento no encontrado');
        let foundProvincia = await Provincia.findAll({where:{DepartamentoId:id,borradoLogico:false}});
        if (foundProvincia.length>0) throw new Error('El departamento tiene provincias asociadas');
        let deletedDepartamento = await foundDepartamento.update({borradoLogico:!foundDepartamento.borradoLogico},{transaction:transactionEliminarDepartamento});
        await transactionEliminarDepartamento.commit();
        return deletedDepartamento;
    } catch (error) {
        await transactionEliminarDepartamento.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllDepartamento,createDepartamento, deleteDepartamento};