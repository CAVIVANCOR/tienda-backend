const {Personal,TipoDocIdentidad} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            idHistorico:elem.id,
            nombres:elem.nombres,
            email:elem.email,
            telefonos:elem.telefonos,
            urlFoto:"",
            vendedor:elem.vendedor,
            created:false,
            cesado:elem.false,
            borradoLogico:false,
            TipoDocIdentidadId: elem.codTipoDI,
            nroDocIdentidad: elem.nroDocDI,
        };
    });
    return clean;
};

const cargaBDPersonal = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Personal.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllPersonal= async ()=>{
    let databasePersonal = null;
    let apiPersonalRaw = null;
    let apiPersonal = null;
    databasePersonal = await Personal.findAll({
        include:{
            model:TipoDocIdentidad,
            attributes:["descripcion","codSunat"]
        }
    });
    if (databasePersonal.length===0){
        apiPersonalRaw = (await axios.get('http://192.168.18.15:82/personal')).data;
        apiPersonal = await cleanArray(apiPersonalRaw);
        await cargaBDPersonal(apiPersonal);
        databasePersonal = await Personal.findAll({
            include:{
                model:TipoDocIdentidad,
                attributes:["descripcion","codSunat"]
            }
        });
    }
    return databasePersonal;
};

module.exports = {getAllPersonal};