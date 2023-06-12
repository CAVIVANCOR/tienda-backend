const {DirCliProv,Distrito,Provincia,Departamento,Pais,CabMovAlmacen,CabCompras,CabVentas} = require("../../db");
const regDirCliProvUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Distrito,
        attributes:["descripcion","codSunat","codPostal"],
        include:[{
            model:Provincia,
            attributes:["descripcion","codSunat"],
            include:[{
                model:Departamento,
                attributes:["descripcion","codSunat"],
                    include:[{
                        model:Pais,
                        attributes:["descripcion","codSunat"],
                        required:true
                    }]
            }]
        }]
    }]
};
const {where,...regDirCliProvAdmin}=regDirCliProvUsuario;
const getAllDirCliProv= async (isAdministrator=false)=>{
    let regDirCliProv = regDirCliProvUsuario;
    if (isAdministrator) regDirCliProv = regDirCliProvAdmin;
    let databaseDirCliProv = await DirCliProv.findAll(regDirCliProv);
    return databaseDirCliProv;
};

const createDirCliProv = async (regDirCliProv)=>{
    const transactionCrearDirCliProv = await DirCliProv.sequelize.transaction();
    try {
        //await DirCliProv.sequelize.query('Lock Table DirCliProv',{transaction:transactionCrearDirCliProv});
        let maxIdDirCliProv = await DirCliProv.max("id");
        let newDirCliProv = await DirCliProv.create({id:maxIdDirCliProv+1, ...regDirCliProv},{transaction:transactionCrearDirCliProv});
        await transactionCrearDirCliProv.commit();
        console.log('Registro creado OK Tabla DirCliProv')
        return newDirCliProv;
        } catch (error) {
            await transactionCrearDirCliProv.rollback();
            console.log(error.message);
            throw new Error(error.message);
        };
};

const deleteDirCliProv = async (id)=>{
    const transactionEliminarDirCliProv = await DirCliProv.sequelize.transaction();
    try {
        let foundDirCliProv = await DirCliProv.findByPk(id);
        if (!foundDirCliProv) throw new Error("ID DirCliProv no encontrado");
        let foundCabMovalmacen = await CabMovAlmacen.findAll({
            where: {
                [Op.or]: [
                    { idDirOrigen: id },
                    { idDirEntrega: id }
                ],
                borradoLogico: false}
            }
        );
        let foundCabCompras = await CabCompras.findAll({
            where: {
                [Op.or]: [
                    { idDirOrigen: id },
                    { idDirEntrega: id }
                ],
                borradoLogico: false}
            }
        );
        let foundCabVentas = await CabVentas.findAll({
            where: {
                [Op.or]: [
                    { idDirOrigen: id },
                    { idDirEntrega: id }
                ],
                borradoLogico: false}
            }
        );
        if (foundCabMovalmacen.length>0) throw new Error("No se puede eliminar porque tiene movimientos en Almacen");
        if (foundCabCompras.length>0) throw new Error("No se puede eliminar porque tiene Movimientos en Compras");
        if (foundCabVentas.length>0) throw new Error("No se puede eliminar porque tiene Movimientos en Ventas");
        let deletedDirCliProv = await foundDirCliProv.update({borradoLogico:!foundDirCliProv.borradoLogico},{transaction:transactionEliminarDirCliProv});
        await transactionEliminarDirCliProv.commit();
        return deletedDirCliProv;
    } catch (error) {
        await transactionEliminarDirCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllDirCliProv,createDirCliProv,deleteDirCliProv};
