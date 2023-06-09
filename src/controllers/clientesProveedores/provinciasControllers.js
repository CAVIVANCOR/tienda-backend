const {Provincia, Departamento, Pais} = require("../../db");
const axios = require("axios");

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
    }
};

const getAllProvincia= async ()=>{
    let databaseProvincias = null;
    let apiProvinciasRaw = null;
    let apiProvincias = null;
    databaseProvincias = await Provincia.findAll({
        include:[{
            model:Departamento,
            attributes:["descripcion","codSunat"],
            include:[{
                model:Pais,
                attributes:["descripcion","codSunat"]
            }]
        }]
    });
    if (databaseProvincias.length===0){
        apiProvinciasRaw = (await axios.get('http://192.168.18.15:82/provincias')).data;
        apiProvincias = await cleanArray(apiProvinciasRaw);
        await cargaBDProvincia(apiProvincias);
        databaseProvincias = await Provincia.findAll({
            include:[{
                model:Departamento,
                attributes:["descripcion","codSunat"],
                include:[{
                    model:Pais,
                    attributes:["descripcion","codSunat"]
                }]
            }]
        });
    }
    return databaseProvincias;
};

const createProvicias = async (regProvincias)=>{
    const transactionCrearProvincias = await Provincia.sequelize.transaction();
    try {
        //await Provincia.sequelize.query('Lock Table Provincia',{transaction:transactionCrearProvincias});
        let maxIdProvincia = await Provincia.max('id',{transaction:transactionCrearProvincias});
        let newProvincia = await Provincia.create({id:maxIdProvincia+1, ...regProvincias},{transaction:transactionCrearProvincias});
        await transactionCrearProvincias.commit();
        console.log('Registro creado OK Tabla Provincia')
        return newProvincia;
    } catch (error) {
        await transactionCrearProvincias.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllProvincia, createProvicias};