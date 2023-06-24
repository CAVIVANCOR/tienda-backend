const {ClienteProveedor,Distrito,TipoDocIdentidad,TipoCliProv,CabMovAlmacen,CabCompras,CabVentas, DirCliProv} = require("../../db");
const axios = require("axios");
const {Op}=require("sequelize");
const regClienteProveedorUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:TipoDocIdentidad,
        attributes:["descripcion"]
    },{
        model:TipoCliProv,
        attributes:["descripcion","clienteProveedor"]
}]
};
const {where,...regClienteProveedorAdmin}=regClienteProveedorUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            razonSocial:elem.razonSocial,
            nombreComercial:elem.nombreComercial,
            numDocIdentidad:elem.numDocIdentidad,
            telefonos:elem.telefonos,
            email:elem.email,
            monedaLineaCredito:elem.monedaLineaCredito,
            lineaCreditoMN:elem.lineaCreditoMN,
            lineaCreditoME:elem.lineaCreditoME,
            saldoAnticiposMN:elem.saldoAnticiposMN,
            saldoAnticiposME:elem.saldoAnticiposME,
            monedaMontoAplicaDesc:elem.monedaMontoAplicaDesc,
            porcentajeDesc:elem.porcentajeDesc,
            montoAplicaDescMN:elem.montoAplicaDescMN,
            montoAplicaDescME:elem.montoAplicaDescME,
            idHistorico:elem.id,
            codDirFiscal:elem.codDirFiscal,
            codDirGuia:elem.codDirGuia,
            dirFiscal:elem.dirFiscal,
            dirGuia:elem.dirGuia,
            TipoDocIdentidadId:elem.TipoDocIdentidadId,
            TipoCliProvId:elem.TipoCliProvId,
        };
    });
    return clean;
};


const generaDirCliProv = async (data) => {
    const transactionGeneraDirCliProv = await DirCliProv.sequelize.transaction();
    try {
        await Promise.all(
            data.map(async (element) => {
                    let codDistritoEncontrado = 0;
                    let distritoEncontrado = null;
                    if (element.codDirFiscal === element.codDirGuia && element.codDirFiscal !== '') {
                        distritoEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirFiscal}}});
                        if (distritoEncontrado) {
                            let distritosEncontradosConvertidos = JSON.stringify(distritoEncontrado);
                            let distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                            codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                            await DirCliProv.create({
                                direccion: element.dirFiscal,
                                telefonos: element.telefonos,
                                email: element.email,
                                principal: true,
                                fiscal: true,
                                ClienteProveedorId: element.id,
                                DistritoId: Number(codDistritoEncontrado),
                                idHistorico: 0
                                }, { transaction: transactionGeneraDirCliProv });
                        }
                    } 
                    else if (element.codDirGuia !== '') {
                            distritoEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirFiscal}}});
                            if (distritoEncontrado) {
                                let distritosEncontradosConvertidos = JSON.stringify(distritoEncontrado);
                                let distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                                codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                                await DirCliProv.create({
                                    direccion: element.dirFiscal,
                                    telefonos: element.telefonos,
                                    email: element.email,
                                    principal: true,
                                    fiscal: true,
                                    ClienteProveedorId: element.id,
                                    DistritoId: Number(codDistritoEncontrado),
                                    idHistorico: 0
                                }, { transaction: transactionGeneraDirCliProv });
                            };
                            distritoEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirGuia}}});
                            if (distritoEncontrado) {
                                let distritosEncontradosConvertidos = JSON.stringify(distritoEncontrado);
                                let distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                                codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                                await DirCliProv.create({
                                    direccion: element.dirGuia,
                                    telefonos: element.telefonos,
                                    email: element.email,
                                    principal: true,
                                    fiscal: false,
                                    ClienteProveedorId: element.id,
                                    DistritoId: Number(codDistritoEncontrado),
                                    idHistorico: 0
                                    }, { transaction: transactionGeneraDirCliProv });
                            };
                    }
            })
        );
        await transactionGeneraDirCliProv.commit();
    } catch (error) {
    await transactionGeneraDirCliProv.rollback();
    console.log(error.message);
    throw new Error(error.message);
    }

}

const createClienteProveedor = async (regClienteProveedor)=>{
    const transactionCrearCliProv = await ClienteProveedor.sequelize.transaction();
    try {
        let maxIdClienteProveedor = await ClienteProveedor.max('id');
        let newClienteProveedor = await ClienteProveedor.create({id:maxIdClienteProveedor+1, ...regClienteProveedor}, { transaction: transactionCrearCliProv });
        await transactionCrearCliProv.commit();
        console.log('registro creado OK Tabla ClienteProveedor',newClienteProveedor);
        return newClienteProveedor;
    } catch (error) {
        await transactionCrearCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};


const cargaBDClienteProveedor = async (data) => {
    const transactionLoteCrearCliProv = await ClienteProveedor.sequelize.transaction();
    try {
        await Promise.all(
            data.map(async (element) => {
                await ClienteProveedor.create(element, { transaction: transactionLoteCrearCliProv });   
            })
        );
        await transactionLoteCrearCliProv.commit();
    } catch (error) {
        await transactionLoteCrearCliProv.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const getAllClienteProveedor= async (isAdministrator=false)=>{
    try {
        let databaseClienteProveedor = null;
        let apiClienteProveedorRaw = null;
        let apiClienteProveedor = null;
        let regClienteProveedor = regClienteProveedorUsuario;
        if (isAdministrator) regClienteProveedor = regClienteProveedorAdmin;
        databaseClienteProveedor = await ClienteProveedor.findAll(regClienteProveedor);
        if (databaseClienteProveedor.length===0){
            apiClienteProveedorRaw = (await axios.get('http://192.168.18.15:82/clientesProveedores')).data;
            apiClienteProveedor = await cleanArray(apiClienteProveedorRaw)
            await cargaBDClienteProveedor(apiClienteProveedor);
            console.log('Concluyo cargaBDClienteProveedor');
            await generaDirCliProv(apiClienteProveedor);
            console.log('Concluyo generaDirCliProv');
            databaseClienteProveedor = await ClienteProveedor.findAll(regClienteProveedor);
        }
        return databaseClienteProveedor;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};


const deleteClienteProveedor = async (id)=>{
    let transactionEliminarClienteProveedor = await ClienteProveedor.sequelize.transaction();
    try {
        let foundClienteProveedor = await ClienteProveedor.findByPk(id);
        if (!foundClienteProveedor) throw new Error('ID ClienteProveedor no encontrado');
        let foundCabMovalmacen = await CabMovAlmacen.findAll({where:{ClienteProveedorId:id,borradoLogico:false}});
        let foundCabCompras = await CabCompras.findAll({where:{ClienteProveedorId:id,borradoLogico:false}});
        let foundCabVentas = await CabVentas.findAll({where:{ClienteProveedorId:id,borradoLogico:false}});
        if (foundCabMovalmacen.length>0) throw new Error('ClienteProveedor tiene movimientos de Almacen pendientes');
        if (foundCabCompras.length>0) throw new Error('ClienteProveedor tiene movimientos de Compras pendientes');
        if (foundCabVentas.length>0) throw new Error('ClienteProveedor tiene movimientos de Ventas pendientes');
        let deletedClienteProveedor = await foundClienteProveedor.update({borradoLogico:!foundClienteProveedor.borradoLogico},{transaction:transactionEliminarClienteProveedor});
        await transactionEliminarClienteProveedor.commit();
        console.log('registro eliminado OK Tabla ClienteProveedor');
        return deletedClienteProveedor;
    } catch (error) {
        await transactionEliminarClienteProveedor.rollback();
        console.log(error.message);
        throw new Error(error.message);
    }
}

module.exports = {getAllClienteProveedor,createClienteProveedor,deleteClienteProveedor};