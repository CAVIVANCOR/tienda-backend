const {UbicaAlmacen, Almacen,DetMovAlmacen} = require("../../db");
const axios = require("axios");
const regUbicacionFisicaAlmacenUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Almacen,
        attributes:["descripcion","kardex","direccion"]
    }]
};
const {where,...regUbicacionFisicaAlmacenAdmin}=regUbicacionFisicaAlmacenUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcionBase:elem.descripcionBase,
            descripcionDetallada:elem.descripcionDetallada,
            descripcionArmada:elem.descripcionArmada,
            corredor:elem.corredor,
            estanteria:elem.estanteria,
            nivel:elem.nivel,
            AlmacenId:elem.AlmacenId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDUbicacionFisicaAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await UbicaAlmacen.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllUbicacionFisicaAlmacen= async (isAdministrator=false)=>{
    let databaseUbicacionFisicaAlmacen = null;
    let apiUbicacionFisicaAlmacenRaw = null;
    let apiUbicacionFisicaAlmacen = null;
    let regUbicacionFisicaAlmacen = regUbicacionFisicaAlmacenUsuario;
    if (isAdministrator) regUbicacionFisicaAlmacen = regUbicacionFisicaAlmacenAdmin;
    databaseUbicacionFisicaAlmacen = await UbicaAlmacen.findAll(regUbicacionFisicaAlmacen);
    if (databaseUbicacionFisicaAlmacen.length===0){
        apiUbicacionFisicaAlmacenRaw = (await axios.get('http://192.168.18.15:82/ubicacionesFisicasAlmacen')).data;
        apiUbicacionFisicaAlmacen = await cleanArray(apiUbicacionFisicaAlmacenRaw);
        await cargaBDUbicacionFisicaAlmacen(apiUbicacionFisicaAlmacen);
        databaseUbicacionFisicaAlmacen = await UbicaAlmacen.findAll(regUbicacionFisicaAlmacen);
    };
    return databaseUbicacionFisicaAlmacen;
};

const createUbicacionFisicaAlmacen = async (regUbicacionFisicaAlmacen)=>{
    const transactionCrearUbicacionFisicaAlmacen = await UbicaAlmacen.sequelize.transaction();
    try {
        let maxIdUbicacionFisicaAlmacen = await UbicaAlmacen.max("id");
        let newUbicacionFisicaAlmacen = await UbicaAlmacen.create({id:maxIdUbicacionFisicaAlmacen+1, ...regUbicacionFisicaAlmacen},{transaction:transactionCrearUbicacionFisicaAlmacen});
        await transactionCrearUbicacionFisicaAlmacen.commit();
        console.log('Registro creado OK Tabla UbicacionFisicaAlmacen')
        return newUbicacionFisicaAlmacen;
    } catch (error){
        await transactionCrearUbicacionFisicaAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteUbicacionFisicaAlmacen = async (id)=>{
    const transactionEliminarUbicacionFisicaAlmacen = await UbicaAlmacen.sequelize.transaction();
    try {
        const foundUbicacionFisicaAlmacen = await UbicaAlmacen.findByPk(id);
        if (!foundUbicacionFisicaAlmacen) {
            throw new Error('No se ha encontrado el ID de Ubicacion Fisica Almacen');
        }
        let foundDetMovAlmacen = await DetMovAlmacen.findOne({
            where: {
                [Op.or]: [
                    { codUbicacionOrigen: id },
                    { codUbicacionDestino: id }
                ],
                borradoLogico: false}
            }
        );
        if (foundDetMovAlmacen) throw new Error('No se puede marcar como borrado La Ubicacion Fisica Almacen porque hay Detalles de Movimientos que lo referencian');
        let deletedUbicacionFisicaAlmacen = await foundUbicacionFisicaAlmacen.update({borradoLogico:!foundUbicacionFisicaAlmacen.borradoLogico},{transaction:transactionEliminarUbicacionFisicaAlmacen});
        await transactionEliminarUbicacionFisicaAlmacen.commit();
        console.log('Registro Eliminado OK Tabla UbicacionFisicaAlmacen')
        return deletedUbicacionFisicaAlmacen;
    } catch (error) {
        await transactionEliminarUbicacionFisicaAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

const updateUbicacionFisicaAlmacen = async (id,regUbicacionFisicaAlmacen)=>{
    const transactionActualizarUbicacionFisicaAlmacen = await UbicaAlmacen.sequelize.transaction();
    try {
        let foundUbicacionFisicaAlmacen = await UbicaAlmacen.findByPk(id);
        if (!foundUbicacionFisicaAlmacen) throw new Error('No se ha encontrado el ID de Ubicacion Fisica Almacen');
        let updatedUbicacionFisicaAlmacen = await foundUbicacionFisicaAlmacen.update(regUbicacionFisicaAlmacen,{transaction:transactionActualizarUbicacionFisicaAlmacen});
        await transactionActualizarUbicacionFisicaAlmacen.commit();
        console.log('Registro actualizado OK Tabla UbicacionFisicaAlmacen')
        return updatedUbicacionFisicaAlmacen;
    } catch (error) {
        await transactionActualizarUbicacionFisicaAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchUbicacionFisicaAlmacen = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsUbicacionFisicaAlmacen = await UbicaAlmacen.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchUbicacionFisicaAlmacen:Registros encontrados en Tabla UbicacionFisicaAlmacen",foundRegsUbicacionFisicaAlmacen, foundRegsUbicacionFisicaAlmacen.length);
        return foundRegsUbicacionFisicaAlmacen;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};


module.exports = {getAllUbicacionFisicaAlmacen,createUbicacionFisicaAlmacen, deleteUbicacionFisicaAlmacen, updateUbicacionFisicaAlmacen, searchUbicacionFisicaAlmacen};