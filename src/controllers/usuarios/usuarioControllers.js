const {Usuario, Personal, Rol,CabCompras,CabVentas,CabMovAlmacen,DetMovCuentas} = require("../../db");
const axios = require("axios");
const regUsuarioUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Personal,
        attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor"],
    },
    {
        model:Rol,
        attributes:["descripcion","superUsuario"]
    }],
};
const {where,...regUsuarioAdmin}=regUsuarioUsuario;
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

const getAllUsuarios= async (isAdministrator=false)=>{
    let databaseUsuarios = null;
    let apiUsuariosRaw = null;
    let apiUsuarios = null;
    let regUsuario = regUsuarioUsuario;
    if (isAdministrator) regUsuario = regUsuarioAdmin;
    databaseUsuarios = await Usuario.findAll(regUsuario);
    if (databaseUsuarios.length===0){
        apiUsuariosRaw = (await axios.get('http://192.168.18.15:82/usuarios')).data;
        apiUsuarios = await cleanArray(apiUsuariosRaw);
        await cargaBDUsuario(apiUsuarios);
        databaseUsuarios = await Usuario.findAll(regUsuario);
    }
    return databaseUsuarios;
};
const createUsuario = async (regUsuario)=>{
    const transactionCrearUsuario = await Usuario.sequelize.transaction();
    try {
        //await Usuario.sequelize.query('Lock Table Usuario',{transaction:transactionCrearUsuario});
        let maxIdUsuario = await Usuario.max('id');
        let newUsuario = await Usuario.create({id:maxIdUsuario+1, ...regUsuario},{transaction:transactionCrearUsuario});
        await transactionCrearUsuario.commit();
        console.log('Registro creado OK Tabla Usuario')
        return newUsuario;
    } catch (error) {
        await transactionCrearUsuario.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteUsuario = async (id)=>{
    let transactionEliminarUsuario = await Usuario.sequelize.transaction();
    try {
        let foundUsuario = await Usuario.findByPk(id);
        if (!foundUsuario) throw new Error('ID de Usuario no encontrado');
        let foundCabCompras = await CabCompras.findAll({where:{UsuarioId:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{UsuarioId:id,borradoLogico:false}});
        let foundCabMovAlmacen = await CabMovAlmacen.findAll({where:{UsuarioId:id,borradoLogico:false}});
        let foundDetMovCuentas = await DetMovCuentas.findAll({where:{UsuarioId:id,borradoLogico:false}});
        if (foundCabCompras.length>0) throw new Error('No se puede eliminar el usuario porque tiene compras asociadas');
        if (foundCabVentas.length>0) throw new Error('No se puede eliminar el usuario porque tiene ventas asociadas');
        if (foundCabMovAlmacen.length>0) throw new Error('No se puede eliminar el usuario porque tiene movimientos almacen asociados');
        if (foundDetMovCuentas.length>0) throw new Error('No se puede eliminar el usuario porque tiene movimientos cuentas asociados');
        let deletedUsuario = await foundUsuario.update({borradoLogico:!foundUsuario.borradoLogico},{transaction:transactionEliminarUsuario});
        await transactionEliminarUsuario.commit();
        console.log('Registro eliminado OK Tabla Usuario');
        return deletedUsuario;
    } catch (error) {
        await transactionEliminarUsuario.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateUsuario = async (id,regUsuario)=>{
    let transactionActualizarUsuario = await Usuario.sequelize.transaction();
    try {
        let foundUsuario = await Usuario.findByPk(id);
        if (!foundUsuario) throw new Error('ID de Usuario no encontrado');
        let updatedUsuario = await foundUsuario.update(regUsuario,{transaction:transactionActualizarUsuario});
        await transactionActualizarUsuario.commit();
        console.log('Registro actualizado OK Tabla Usuario');
        return updatedUsuario;
    } catch (error) {
        await transactionActualizarUsuario.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllUsuarios,createUsuario,deleteUsuario, updateUsuario};