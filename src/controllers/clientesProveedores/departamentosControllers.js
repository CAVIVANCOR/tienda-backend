const {DepartamentoUbigeo} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            origen:elem.origen,
            PaisUbigeoId:elem.idPais,
        };
    });
    return clean;
};

const cargaBDDepartamento = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await DepartamentoUbigeo.create(element);
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
    databaseDepartamentos = await DepartamentoUbigeo.findAll();
    if (databaseDepartamentos.length===0){
        apiDepartamentosRaw = (await axios.get('http://192.168.18.15:82/departamentos')).data;
        apiDepartamentos = await cleanArray(apiDepartamentosRaw);
        await cargaBDDepartamento(apiDepartamentos);
        databaseDepartamentos = await DepartamentoUbigeo.findAll();
    }
    return databaseDepartamentos;
};

module.exports = {getAllDepartamento};