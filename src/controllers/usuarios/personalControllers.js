const {Personal,TipoDocIdentidad,sequelize,Usuario } = require("../../db");
const axios = require("axios");
const regPersonalUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:TipoDocIdentidad,
        attributes:["descripcion","codSunat"]
    }]
};
const {where,...regPersonalAdmin}=regPersonalUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
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
            idHistorico:elem.id,
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

const getAllPersonal= async (isAdministrator=false)=>{
    let databasePersonal = null;
    let apiPersonalRaw = null;
    let apiPersonal = null;
    let regPersonal = regPersonalUsuario;
    if (isAdministrator) regPersonal = regPersonalAdmin;
    databasePersonal = await Personal.findAll(regPersonal);
    if (databasePersonal.length===0){
        apiPersonalRaw = (await axios.get('http://192.168.18.15:82/personal')).data;
        apiPersonal = await cleanArray(apiPersonalRaw);
        await cargaBDPersonal(apiPersonal);
        databasePersonal = await Personal.findAll(regPersonal);
    }
    return databasePersonal;
};

const createPersona = async (regPersona)=>{
    const transactionCrearPersona = await Personal.sequelize.transaction();
    try {
        let maxIdPersonal = await Personal.max('id',{transaction:transactionCrearPersona});
        let newPersona = await Personal.create({id:maxIdPersonal+1, ...regPersona},{transaction:transactionCrearPersona});
        await transactionCrearPersona.commit();
        console.log('Registro creado OK Tabla Personal')
        return newPersona;
    } catch (error) {
        await transactionCrearPersona.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deletePersona = async (id)=>{
    let transactionEliminarPersona = await Personal.sequelize.transaction();
    try {
        let foundPersona = await Personal.findByPk(id);
        if (!foundPersona) throw new Error('ID de Personal no encontrado');
        let foundUsuario = await Usuario.findAll({where:{PersonalId:id,borradoLogico:false}});
        if (foundUsuario.length>0) throw new Error('Personal tiene usuarios asociados');
        let deletedPersona = await foundPersona.update({borradoLogico:!foundPersona.borradoLogico},{transaction:transactionEliminarPersona});
        await transactionEliminarPersona.commit();
        console.log('Registro eliminado OK Tabla Personal');
        return deletedPersona;
    } catch (error) {
        await transactionEliminarPersona.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};


module.exports = {getAllPersonal,createPersona,deletePersona};