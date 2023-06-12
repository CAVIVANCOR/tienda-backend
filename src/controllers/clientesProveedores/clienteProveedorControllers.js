const {ClienteProveedor,DirCliProv,Distrito,TipoDocIdentidad,TipoCliProv,CabMovAlmacen,CabCompras,CabVentas} = require("../../db");
const axios = require("axios");
const {Op}=require("sequelize");
const regClienteProveedorUsuario ={
    where: { borradoLogico: false },
    include:[{
        Model:TipoDocIdentidad,
        attributes:["descripcion","codSunat"]
    },{
        Model:TipoCliProv,
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
            TipoDocIdentidadId:elem.TipoDocIdentidadId,
            numDocIdentidad:elem.numDocIdentidad,
            monedaLineaCredito:elem.monedaLineaCredito,
            monedaMontoAplicaDesc:elem.monedaMontoAplicaDesc,
            lineaCreditoMN:elem.lineaCreditoMN,
            lineaCreditoME:elem.lineaCreditoME,
            saldoAnticiposMN:elem.saldoAnticiposMN,
            saldoAnticiposME:elem.saldoAnticiposME,
            porcentajeDesc:elem.porcentajeDesc,
            montoAplicaDescMN:elem.montoAplicaDescMN,
            montoAplicaDescME:elem.montoAplicaDescME,
            TipoCliProvId:elem.TipoCliProvId,
            codDirFiscal:elem.codDirFiscal,
            codDirGuia:elem.codDirGuia,
            dirFiscal:elem.dirFiscal,
            dirGuia:elem.dirGuia,
            telefonos:elem.telefonos,
            email:elem.email,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDClienteProveedor = async (data)=>{
    let transactionCargaBDClienteProveedor = await ClienteProveedor.sequelize.transaction();
    try {
        let distritosEncontrado = null;
        let distritosEncontradosConvertidos = null;
        let distritosEncontradosConvertidos2 = null;
        let codDistritoEncontrado = 0;
        await Promise.all(
            data.map(async(element)=>{
                codDistritoEncontrado = 0;
                await ClienteProveedor.create(element);
                if (element.codDirFiscal === element.codDirGuia){
                    if (element.codDirFiscal !== "")
                    {
                        distritosEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirFiscal}}});
                        if (distritosEncontrado){
                            distritosEncontradosConvertidos = JSON.stringify(distritosEncontrado);
                            distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                            codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                        }
                        await DirCliProv.create({
                            direccion:element.dirFiscal,
                            telefonos:element.telefonos,
                            email:element.email,
                            principal:true,
                            fiscal:true,
                            ClienteProveedorId:element.id,
                            DistritoId:Number(codDistritoEncontrado),
                            idHistorico:0
                            }, { transaction: transactionCargaBDClienteProveedor }
                        );
                    }
                }else{
                    if (element.codDirGuia !== ""){
                        distritosEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirFiscal}}});
                        if (distritosEncontrado){
                            distritosEncontradosConvertidos = JSON.stringify(distritosEncontrado);
                            distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                            codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                        }
                        await DirCliProv.create({
                            direccion:element.dirFiscal,
                            telefonos:element.telefonos,
                            email:element.email,
                            principal:true,
                            fiscal:true,
                            ClienteProveedorId:element.id,
                            DistritoId:Number(codDistritoEncontrado),
                            idHistorico:0
                            }, { transaction: transactionCargaBDClienteProveedor }
                        );
                        codDistritoEncontrado = 0;
                        distritosEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirGuia}}});
                        if (distritosEncontrado){
                            distritosEncontradosConvertidos = JSON.stringify(distritosEncontrado);
                            distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                            codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                        }
                        await DirCliProv.create({
                            direccion:element.dirGuia,
                            telefonos:element.telefonos,
                            email:element.email,
                            principal:true,
                            fiscal:false,
                            ClienteProveedorId:element.id,
                            DistritoId:Number(codDistritoEncontrado),
                            idHistorico:0
                            }, { transaction: transactionCargaBDClienteProveedor }
                        );
                    }
                };
            })
        )
        await transactionCargaBDClienteProveedor.commit();
        return 
    } catch (error) {
        await transactionCargaBDClienteProveedor.rollback();
        console.log(error.message)
        throw new Error(error.message);
    }
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
            apiClienteProveedor = await cleanArray(apiClienteProveedorRaw);
            await cargaBDClienteProveedor(apiClienteProveedor);
            databaseClienteProveedor = await ClienteProveedor.findAll(regClienteProveedor);
        }
        return databaseClienteProveedor;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const createClienteProveedor = async (regClienteProveedor)=>{
    const transactionCrearClienteProveedor = await ClienteProveedor.sequelize.transaction();
    try {
        let maxIdClienteProveedor = await ClienteProveedor.max('id');
        let newClienteProveedor = await ClienteProveedor.create({id:maxIdClienteProveedor+1, ...regClienteProveedor}, { transaction: transactionCrearClienteProveedor });
        await transactionCrearClienteProveedor.commit();
        console.log('registro creado OK Tabla ClienteProveedor');
        return newClienteProveedor;
    } catch (error) {
        await transactionCrearClienteProveedor.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
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