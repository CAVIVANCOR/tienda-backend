const {Usuario, Personal, Rol} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            usuario:elem.usuario,
            password:elem.password,
            PersonalId:elem.PersonalId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDUsuario = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Usuario.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllUsuarios= async ()=>{
    let databaseUsuarios = null;
    let apiUsuariosRaw = null;
    let apiUsuarios = null;
    databaseUsuarios = await Usuario.findAll({
        include:[{
            model:Personal,
            attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor"],
        },
        {
            model:Rol,
            attributes:["descripcion","superUsuario"]
        }],
    });
    if (databaseUsuarios.length===0){
        apiUsuariosRaw = (await axios.get('http://192.168.18.15:82/usuarios')).data;
        apiUsuarios = await cleanArray(apiUsuariosRaw);
        await cargaBDUsuario(apiUsuarios);
        databaseUsuarios = await Usuario.findAll({
            include:[{
                model:Personal,
                attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor"],
            },
            {
                model:Rol,
                attributes:["descripcion","superUsuario"]
            }],
        });
    }
    return databaseUsuarios;
};
const createUsuario = async (regUsuario)=>{
    const transactionCrearUsuario = await Usuario.sequelize.transaction();
    try {
        //await Usuario.sequelize.query('Lock Table Usuario',{transaction:transactionCrearUsuario});
        let maxIdUsuario = await Usuario.max('id',{transaction:transactionCrearUsuario});
        let newUsuario = await Usuario.create({id:maxIdUsuario+1, ...regUsuario},{transaction:transactionCrearUsuario});
        await transactionCrearUsuario.commit();
        console.log('Registro creado OK Tabla Usuario')
        return newUsuario;
    } catch (error) {
        await transactionCrearUsuario.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllUsuarios,createUsuario};