const {ContactosCliProv,CabMovAlmacen,CabCompras,CabVentas} = require("../../db");
const regContactosCliProvUsuario ={
    where: { borradoLogico: false },
};
const {where,...regContactosCliProvAdmin}=regContactosCliProvUsuario;
const getAllContactosCliProv= async (isAdministrator=false)=>{
    let regContactosCliProv = regContactosCliProvUsuario;
    if (isAdministrator) regContactosCliProv = regContactosCliProvAdmin;
    let databaseContactosCliProv = await ContactosCliProv.findAll();
    return databaseContactosCliProv;
};

const createContactosCliProv = async (regContactosCliProv)=>{
    const transactionCrearContactosCliProv = await ContactosCliProv.sequelize.transaction();
    try {
        let maxIdContactosCliProv = await ContactosCliProv.max("id");
        let newContactosCliProv = await ContactosCliProv.create({id:maxIdContactosCliProv+1, ...regContactosCliProv},{transaction:transactionCrearContactosCliProv});
        await transactionCrearContactosCliProv.commit();
        console.log('Registro creado OK Tabla ContactosCliProv')
        return newContactosCliProv;
    } catch (error) {
        await transactionCrearContactosCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteContactosCliProv = async (id)=>{
    let transactionEliminarContactosCliProv = await ContactosCliProv.sequelize.transaction();
    try {
        let foundContactosCliProv = await ContactosCliProv.findByPk(id);
        if (!foundContactosCliProv) throw new Error('ID ContactosCliProv no encontrado');
        let foundCabMovalmacen = await CabMovAlmacen.findAll({where:{idContacto:id,borradoLogico:false}});
        let foundCabCompras = await CabCompras.findAll({where:{idContacto:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{idContacto:id,borradoLogico:false}});
        if (foundCabMovalmacen.length>0) throw new Error("El Contacto No puede ser eliminado,posee movimientos en Almacen"); 
        if (foundCabCompras.length>0) throw new Error("El Contacto No puede ser eliminado,posee movimientos en Compras"); 
        if (foundCabVentas.length>0) throw new Error("El Contacto No puede ser eliminado,posee movimientos en Ventas");
        let deletedContactosCliProv = await foundContactosCliProv.update({borradoLogico:!foundContactosCliProv.borradoLogico},{transaction:transactionEliminarContactosCliProv});
        await transactionEliminarContactosCliProv.commit();
        console.log('Registro eliminado OK Tabla ContactosCliProv');
        return deletedContactosCliProv;
    } catch (error) {
        await transactionEliminarContactosCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

const updateContactosCliProv = async (id,regContactosCliProv)=>{
    let transactionActualizarContactosCliProv = await ContactosCliProv.sequelize.transaction();
    try {
        let foundContactosCliProv = await ContactosCliProv.findByPk(id);
        if (!foundContactosCliProv) throw new Error('ID ContactosCliProv no encontrado');
        let updatedContactosCliProv = await foundContactosCliProv.update(regContactosCliProv,{transaction:transactionActualizarContactosCliProv});
        await transactionActualizarContactosCliProv.commit();
        console.log('Registro actualizado OK Tabla ContactosCliProv');
        return updatedContactosCliProv;
    } catch (error) {
        await transactionActualizarContactosCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchContactosCliProv = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsContactosCliProv = await ContactosCliProv.findAll({
            where: {
                [Op.and]: buscar
            }
        });
        console.log("searchContactosCliProv:Registros encontrados en Tabla ContactosCliProv",foundRegsContactosCliProv, foundRegsContactosCliProv.length);
        return foundRegsContactosCliProv;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllContactosCliProv,createContactosCliProv,deleteContactosCliProv, updateContactosCliProv, searchContactosCliProv};