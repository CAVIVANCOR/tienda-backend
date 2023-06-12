const {DetMovAlmacen,CabMovAlmacen,Producto,EstadoProd, KardexAlmacen} = require("../../db");
const axios = require("axios");
const regDetMovAlmacenUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:CabMovAlmacen,
        attributes:["fecha","serieDcmto","correlativoDcmto","idDirOrigen","idDirEntrega","idTransportista","idChofer","idDocOrigenVenta","idDocOrigenCompra"],
    },{
        model:Producto,
        attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto","valorVentaUnitMN","valorVentaUnitME","porcentajeMaxDescConAutorizacion","porcentajeMaxDescSinAutorizacion","porcentajeMaxDescPorCantidad","cantidadAplicaDesc","moneda","noKardex","listaPrecios","costoUnitarioMN","costoUnitarioME"],
    },{
        model:EstadoProd,
        attributes:["descripcion"]
    }]
};
const {where,...regDetMovAlmacenAdmin}=regDetMovAlmacenUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            nroLote:elem.nroLote,
            nroEnvase:elem.nroEnvase,
            nroSerie:elem.nroSerie,
            // fechaProduccion: elem.fechaProduccion,
            // fechaVencimiento: elem.fechaVencimiento,
            cantidad:elem.cantidad,
            valorUnitMN:elem.valorUnitMN,
            codUbicacionOrigen:elem.codUbicacionOrigen,
            codUbicacionDestino:elem.codUbicacionDestino,
            CabMovAlmacenId:elem.CabMovAlmacenId,
            ProductoId:elem.ProductoId,
            EstadoProdId:elem.EstadoProductoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDDetMovAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await DetMovAlmacen.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllDetMovAlmacen= async (isAdministrator=false)=>{
    let databaseDetMovAlmacen = null;
    let apiDetMovAlmacenRaw = null;
    let apiDetMovAlmacen = null;
    let regDetMovAlmacen = regDetMovAlmacenUsuario;
    if (isAdministrator) regDetMovAlmacen = regDetMovAlmacenAdmin;
    databaseDetMovAlmacen = await DetMovAlmacen.findAll(regDetMovAlmacen);
    if (databaseDetMovAlmacen.length===0){
        apiDetMovAlmacenRaw = (await axios.get('http://192.168.18.15:82/detMovAlmacen')).data;
        apiDetMovAlmacen = await cleanArray(apiDetMovAlmacenRaw);
        await cargaBDDetMovAlmacen(apiDetMovAlmacen);
        databaseDetMovAlmacen = await DetMovAlmacen.findAll(regDetMovAlmacen);
    }
    return databaseDetMovAlmacen;
};

const createDetMovAlmacen = async (regDetMovAlmacen)=>{
    let transactionCrearDetMovAlmacen = await DetMovAlmacen.sequelize.transaction();
    try {
        let maxIdDetMovAlmacen = await DetMovAlmacen.max("id");
        let newDetMovAlmacen = await DetMovAlmacen.create({id:maxIdDetMovAlmacen+1, ...regDetMovAlmacen},{transaction:transactionCrearDetMovAlmacen});
        await transactionCrearDetMovAlmacen.commit();
        console.log('Registro creado OK Tabla DetMovAlmacen')
        return newDetMovAlmacen;
    } catch (error) {
        await transactionCrearDetMovAlmacen.rollback();
        console.log(error.message)
        throw new Error(error.message);
    };
};

const deleteDetMovAlmacen = async (id)=>{
    let transactionEliminarDetMovAlmacen = await DetMovAlmacen.sequelize.transaction();
    try {
        let foundDetMovAlmacen = await DetMovAlmacen.findByPk(id);
        if (!foundDetMovAlmacen) throw new Error("No se encontro el ID del registro en Detalle Movimientos de Almacen");
        let foundKardexAlmacen = await KardexAlmacen.findOne({
            where:{
                DetMovAlmacenId:id
            }
        })
        if (foundKardexAlmacen) throw new Error("El registro se encuentra en Kardex de Almacen, debe eliminar primero el Kardex");
        let deletedDetMovAlmacen = await foundDetMovAlmacen.update({borradoLogico:!foundDetMovAlmacen.borradoLogico},{transaction:transactionEliminarDetMovAlmacen});
        await transactionEliminarDetMovAlmacen.commit();
        console.log('Registro eliminado OK Tabla DetMovAlmacen')
        return deletedDetMovAlmacen;
    } catch (error) {
        await transactionEliminarDetMovAlmacen.rollback();
        console.log(error.message)
        throw new Error(error.message);
    }

}

module.exports = {getAllDetMovAlmacen,createDetMovAlmacen,deleteDetMovAlmacen};