const {TipoCliProv} = require("../../db");
const axios = require("axios");
const ClienteProveedor = require("../../models/clientesProveedores/ClienteProveedor");
const regTipoCliProvUsuario ={
    where: { borradoLogico: false },
};
const {where,...regTipoCliProvAdmin}=regTipoCliProvUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            clienteProveedor:elem.clienteProveedor,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDTipoCliProv = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await TipoCliProv.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllTipoCliProv= async (isAdministrator=false)=>{
    let databaseTipoCliProv = null;
    let apiTipoCliProvRaw = null;
    let apiTipoCliProv = null;
    let regTipoCliProv = regTipoCliProvUsuario;
    if (isAdministrator) regTipoCliProv = regTipoCliProvAdmin;
    databaseTipoCliProv = await TipoCliProv.findAll(regTipoCliProv);
    if (databaseTipoCliProv.length===0){
        apiTipoCliProvRaw = (await axios.get('http://192.168.18.15:82/tiposCliProv')).data;
        apiTipoCliProv = await cleanArray(apiTipoCliProvRaw);
        await cargaBDTipoCliProv(apiTipoCliProv);
        databaseTipoCliProv = await TipoCliProv.findAll(regTipoCliProv);
    }
    return databaseTipoCliProv;
};

const createTipoCliProv = async (regTipoCliProv)=>{
    const transactionCrearTipoCliProv = await TipoCliProv.sequelize.transaction();
    try {
        //await TipoCliProv.sequelize.query('Lock Table TipoCliProv',{transaction:transactionCrearTipoCliProv});
        let maxIdTipoCliProv = await TipoCliProv.max("id");
        let newTipoCliProv = await TipoCliProv.create({id:maxIdTipoCliProv+1, ...regTipoCliProv},{transaction:transactionCrearTipoCliProv});
        await transactionCrearTipoCliProv.commit();
        console.log('Registro creado OK Tabla TipoCliProv')
        return newTipoCliProv;
    } catch (error) {
        await transactionCrearTipoCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteTipoCliProv = async (id)=>{
    const transactionEliminarTipoCliProv = await TipoCliProv.sequelize.transaction();
    try {
        let foundTipoCliProv = await TipoCliProv.findByPk(id);
        if (!foundTipoCliProv) throw new Error('ID de TipoCliProv no encontrada');
        let foundClienteProveedor = await ClienteProveedor.findAll({where:{TipoCliProvId:id,borradoLogico:false}});
        if (foundClienteProveedor.length>0) throw new Error('El TipoCliProv tiene clientes asociados');
        let deletedTipoCliProv = await foundTipoCliProv.update({borradoLogico:!foundTipoCliProv.borradoLogico},{transaction:transactionEliminarTipoCliProv});
        await transactionEliminarTipoCliProv.commit();
        console.log('Registro eliminado OK Tabla TipoCliProv');
        return deletedTipoCliProv;
    } catch (error) {
        await transactionEliminarTipoCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

const updateTipoCliProv = async (id,regTipoCliProv)=>{
    const transactionActualizarTipoCliProv = await TipoCliProv.sequelize.transaction();
    try {
        let foundTipoCliProv = await TipoCliProv.findByPk(id);
        if (!foundTipoCliProv) throw new Error('ID de TipoCliProv no encontrada');
        let updatedTipoCliProv = await foundTipoCliProv.update(regTipoCliProv,{transaction:transactionActualizarTipoCliProv});
        await transactionActualizarTipoCliProv.commit();
        console.log('Registro actualizado OK Tabla TipoCliProv');
        return updatedTipoCliProv;
    } catch (error) {
        await transactionActualizarTipoCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};
const searchTiposCliProv = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsTipoCliProv = await TipoCliProv.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchTiposCliProv:Registros encontrados en Tabla TipoCliProv",foundRegsTipoCliProv, foundRegsTipoCliProv.length);
        return foundRegsTipoCliProv;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllTipoCliProv,createTipoCliProv,deleteTipoCliProv, updateTipoCliProv, searchTiposCliProv};
