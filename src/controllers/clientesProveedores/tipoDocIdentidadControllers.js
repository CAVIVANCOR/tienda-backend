const {TipoDocIdentidad,ClienteProveedor,Chofer,Personal} = require("../../db");
const axios = require("axios");
const regTipoDocIdentidadUsuario ={
    where: { borradoLogico: false },
};
const {where,...regTipoDocIdentidadAdmin}=regTipoDocIdentidadUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            idHistorico:elem.id,
            descripcion:elem.descripcion,
            codSunat:elem.codSunat,
        };
    });
    return clean;
};

const cargaBDTDI = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoDocIdentidad.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    }
};

const getAllTDI= async (isAdministrator=false)=>{
    let databaseTDI = null;
    let apiTDIRaw = null;
    let apiTDI = null;
    let regTipoDocIdentidad = regTipoDocIdentidadUsuario;
    if (isAdministrator) regTipoDocIdentidad = regTipoDocIdentidadAdmin;
    databaseTDI = await TipoDocIdentidad.findAll(regTipoDocIdentidad);
    if (databaseTDI.length===0){
        apiTDIRaw = (await axios.get('http://192.168.18.15:82/tipoDocIdentidad')).data;
        console.log("Hola")
        apiTDI = await cleanArray(apiTDIRaw);
        await cargaBDTDI(apiTDI);
        databaseTDI = await TipoDocIdentidad.findAll(regTipoDocIdentidad);
    }
    return databaseTDI;
};

const createTDI = async (regTDI)=>{
    const transactionCrearTDI = await TipoDocIdentidad.sequelize.transaction();
    try {
        //await TipoDocIdentidad.sequelize.query('Lock Table TipoDocIdentidad',{transaction:transactionCrearTDI});
        let maxIdTDI = await TipoDocIdentidad.max('id');
        let newTDI = await TipoDocIdentidad.create({id:maxIdTDI+1, ...regTDI},{transaction:transactionCrearTDI});
        await transactionCrearTDI.commit();
        console.log('Registro creado OK Tabla TipoDocIdentidad')
        return newTDI;
    } catch (error) {
        await transactionCrearTDI.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteTDI = async (id)=>{
    const transactionEliminarTDI = await TipoDocIdentidad.sequelize.transaction();
    try {
        let foundTipoDocIdentidad = await TipoDocIdentidad.findByPk(id);
        if (!foundTipoDocIdentidad) throw new Error('ID de TipoDocIdentidad no encontrada');
        let foundClienteProveedor = await ClienteProveedor.findAll({where:{TipoDocIdentidadId:id,borradoLogico:false}});
        let foundChoferes = await Chofer.findAll({where:{TipoDocIdentidadId:id,borradoLogico:false}});
        let foundPersonal = await Personal.findAll({where:{TipoDocIdentidadId:id,borradoLogico:false}});
        if (foundClienteProveedor.length>0) throw new Error('El TipoDocIdentidad tiene Clientes Proveedores asociados');
        if (foundChoferes.length>0) throw new Error('El TipoDocIdentidad tiene Choferes asociados');
        if (foundPersonal.length>0) throw new Error('El TipoDocIdentidad tiene Personal asociados');
        let deletedTipoDocIdentidad = await foundTipoDocIdentidad.update({borradoLogico:!foundTipoDocIdentidad.borradoLogico},{transaction:transactionEliminarTDI});
        await transactionEliminarTDI.commit();
        console.log('Registro eliminado OK Tabla TipoDocIdentidad');
        return deletedTipoDocIdentidad;
    } catch (error) {
        await transactionEliminarTDI.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateTDI = async (id,regTDI)=>{
    const transactionActualizarTDI = await TipoDocIdentidad.sequelize.transaction();
    try {
        let foundTipoDocIdentidad = await TipoDocIdentidad.findByPk(id);
        if (!foundTipoDocIdentidad) throw new Error('ID de TipoDocIdentidad no encontrada');
        let updatedTipoDocIdentidad = await foundTipoDocIdentidad.update(regTDI,{transaction:transactionActualizarTDI});
        await transactionActualizarTDI.commit();
        console.log('Registro actualizado OK Tabla TipoDocIdentidad');
        return updatedTipoDocIdentidad;
    } catch (error) {
        await transactionActualizarTDI.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchTDI = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsTDI = await TipoDocIdentidad.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchTDI:Registros encontrados en Tabla TipoDocIdentidad",foundRegsTDI, foundRegsTDI.length);
        return foundRegsTDI;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllTDI,createTDI,deleteTDI, updateTDI, searchTDI};
