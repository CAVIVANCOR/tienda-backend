const {Distrito,Provincia,Departamento,Pais} = require("../../db");
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
    }
};

const getAllDistrito= async ()=>{
    let databaseDistritos = null;
    let apiDistritosRaw = null;
    let apiDistritos = null;
    databaseDistritos = await Distrito.findAll({
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
    });
    if (databaseDistritos.length===0){
        apiDistritosRaw = (await axios.get('http://192.168.18.15:82/distritos')).data;
        apiDistritos = await cleanArray(apiDistritosRaw);
        await cargaBDDistrito(apiDistritos);
        databaseDistritos = await Distrito.findAll({
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
        });
    }
    return databaseDistritos;
};

const createDistrito = async (regDistrito)=>{
    const transactionCrearDistrito = await Distrito.sequelize.transaction();
    try {
       // await Distrito.sequelize.query('Lock Table Distrito',{transaction:transactionCrearDistrito});
        let maxIdDistrito = await Distrito.max('id',{transaction:transactionCrearDistrito});
        let newDistrito = await Distrito.create({id:maxIdDistrito+1, ...regDistrito},{transaction:transactionCrearDistrito});
        await transactionCrearDistrito.commit();
        console.log('Registro creado OK Tabla Distrito')
        return newDistrito;
    } catch (error) {
        await transactionCrearDistrito.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllDistrito,createDistrito};