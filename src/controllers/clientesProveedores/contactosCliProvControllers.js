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

module.exports = {getAllContactosCliProv,createContactosCliProv,deleteContactosCliProv};