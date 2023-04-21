const {DistritoUbigeo,ProvinciaUbigeo,DepartamentoUbigeo,PaisUbigeo} = require("../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
            codPostal:elem.codPostal,
            origen:elem.origen,
            ProvinciaUbigeoId:elem.idProvincia,
        };
    });
    return clean;
};

const cargaBDDistrito = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await DistritoUbigeo.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllDistrito= async ()=>{
    let databaseDistritos = null;
    let apiDistritosRaw = null;
    let apiDistritos = null;
    databaseDistritos = await DistritoUbigeo.findAll({
        include:[{
            model:ProvinciaUbigeo,
            attributes:["descripcion","codSunat"],
            include:[{
                model:DepartamentoUbigeo,
                attributes:["descripcion","codSunat"],
                include:[{
                    model:PaisUbigeo,
                    attributes:["descripcion","codSunat"],
                }]
            }]
        }]
    });
    if (databaseDistritos.length===0){
        apiDistritosRaw = (await axios.get('http://192.168.18.15:82/distritos')).data;
        console.log("apiDistritosRaw",apiDistritosRaw)
        apiDistritos = await cleanArray(apiDistritosRaw);
        await cargaBDDistrito(apiDistritos);
        databaseDistritos = await DistritoUbigeo.findAll({
            include:[{
                model:ProvinciaUbigeo,
                attributes:["descripcion","codSunat"],
                include:[{
                    model:DepartamentoUbigeo,
                    attributes:["descripcion","codSunat"],
                    include:[{
                        model:PaisUbigeo,
                        attributes:["descripcion","codSunat"],
                    }]
                }]
            }]
        });
    }
    return databaseDistritos;
};

module.exports = {getAllDistrito};