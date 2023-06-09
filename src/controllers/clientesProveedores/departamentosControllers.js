const {Departamento,Pais} = require("../../db");
const axios = require("axios");

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
    }
};

const getAllDepartamento= async ()=>{
    let databaseDepartamentos = null;
    let apiDepartamentosRaw = null;
    let apiDepartamentos = null;
    databaseDepartamentos = await Departamento.findAll({
        include:[{
            model:Pais,
            attributes:["descripcion","codSunat"]
        }]
    });
    if (databaseDepartamentos.length===0){
        apiDepartamentosRaw = (await axios.get('http://192.168.18.15:82/departamentos')).data;
        apiDepartamentos = await cleanArray(apiDepartamentosRaw);
        await cargaBDDepartamento(apiDepartamentos);
        databaseDepartamentos = await Departamento.findAll({
            include:[{
                model:Pais,
                attributes:["descripcion","codSunat"]
            }]
        });
    }
    return databaseDepartamentos;
};

const createDepartamento = async (regDepartamento)=>{
    const transactionCrearDepartamento = await Departamento.sequelize.transaction();
    try {
        //await Departamento.sequelize.query('Lock Table Departamento',{transaction:transactionCrearDepartamento});
        let maxIdDepartamento = await Departamento.max('id',{transaction:transactionCrearDepartamento});
        let newDepartamento = await Departamento.create({id:maxIdDepartamento+1, ...regDepartamento},{transaction:transactionCrearDepartamento});
        await transactionCrearDepartamento.commit();
        console.log('Registro creado OK Tabla Departamento')
        return newDepartamento;
    } catch (error) {
        await transactionCrearDepartamento.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllDepartamento,createDepartamento};