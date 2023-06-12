const {CabCompras, DetCompras,FormaPago,CentroCosto, ClienteProveedor, EstadoDoc, TipoDocumento, TipoCambio, Usuario, Personal} = require("../../db");
const axios = require("axios");
const { deleteDetCompras } = require("./detComprasControllers");
const regCabComprasUsuario = {
    where: { borradoLogico: false },
    include:[{
        model:DetCompras,
        attributes:["id","cantidad","vcUnitMN","vcUnitME","porcentajeDescUnit","descUnitMN","descUnitME","vcNetoUnitMN","vcNetoUnitME","vcNetoTotMN","vcNetoTotME","igvUnitMN","igvUnitME","igvTotalMN","igvTotalME","pcUnitMN","pcUnitME","pcTotalMN","pcTotalME","exonerado","descUnitMontoMN","descUnitMontoME","nroMesesGarantia","CabCompraId","ProductoId","EstadoProdId","PreciosCliProvId"]
    },{
        model:FormaPago,
        attributes:["descripcion","nDias","contado","tipo"]
    },{
        model:CentroCosto,
        attributes:["descripcion","tipoIngEgr","calcUtilidades"]
    },{
        model:ClienteProveedor,
        attributes:["razonSocial","nombreComercial","numDocIdentidad","telefonos","email","emailFactSunat","monedaLineaCredito","lineaCreditoMN","lineaCreditoME","saldoAnticiposMN","saldoAnticiposME","monedaMontoAplicaDesc","porcentajeDesc","montoAplicaDescMN","montoAplicaDescME"]
    },{
        model:EstadoDoc,
        attributes:["descripcion"]
    },{
        model:TipoDocumento,
        attributes:["descripcion"],
    },{
        model:TipoCambio,
        attributes:["fecha","compra","venta"]
    },{
        model:Usuario,
        attributes:["usuario"],
        include:[{
            model:Personal,
            attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor"]
        }]
    }]
};

const {where,...regCabComprasAdmin}=regCabComprasUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            fecha:elem.fecha,
            serieDcmto:elem.serieDcmto,
            correlativoDcmto:elem.correlativoDcmto,
            idContacto:elem.idContacto,
            idDirOrigen:elem.idDirOrigen,
            idDirEntrega:elem.idDirEntrega,
            observaciones:elem.observaciones,
            idDocAlmacen:elem.idDocAlmacen,
            tipoCambio:elem.tipoCambio,
            porcentajeIGV:elem.porcentajeIGV,
            emailDestino:elem.emailDestino,
            rutaDcmtoPDF:elem.rutaDcmtoPDF,
            exonerado:elem.exonerado,
            moneda:elem.moneda,
            anticipo:elem.anticipo,
            ClienteProveedorId:elem.ClienteProveedorId,
            FormaPagoId:elem.FormaPagoId,
            EstadoDocId:elem.EstadoDocId,
            UsuarioId:elem.UsuarioId,
            TipoCambioId:elem.TipoCambioId,
            CentroCostoId:elem.CentroCostoId,
            TipoDocumentoId:elem.TipoDocumentoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCabCompras = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await CabCompras.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllCabCompras= async (isAdministrator=false)=>{
    let databaseCabCompras = null;
    let apiCabComprasRaw = null;
    let apiCabCompras = null;
    let regCabCompras = regCabComprasUsuario;
    if (isAdministrator) regCabCompras = regCabComprasAdmin;
    databaseCabCompras = await CabCompras.findAll(regCabCompras);
    if (databaseCabCompras.length===0){
        apiCabComprasRaw = (await axios.get('http://192.168.18.15:82/cabCompras')).data;
        apiCabCompras = await cleanArray(apiCabComprasRaw);
        await cargaBDCabCompras(apiCabCompras);
        databaseCabCompras = await CabCompras.findAll(regCabCompras);
    }
    return databaseCabCompras;
};

const createCabCompras = async (regCabCompras)=>{
    let transactionCrearCabCompras = await CabCompras.sequelize.transaction();
    try {
        //await CabCompras.sequelize.query('Lock Table CabCompras',{transaction:transactionCrearCabCompras});
        let maxIdCabCompras = await CabCompras.max('id');
        let newCabCompras = await CabCompras.create({id:maxIdCabCompras+1, ...regCabCompras},{transaction:transactionCrearCabCompras});
        await DetCompras.bulkCreate(regCabCompras.DetCompras, {transaction:transactionCrearCabCompras});
        await transactionCrearCabCompras.commit();
        return newCabCompras;
    } catch (error) {
        await transactionCrearCabCompras.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteCabCompras = async (id)=>{
    let transactionEliminarCabCompras = await CabCompras.sequelize.transaction();
    try {
        let foundCabCompras = await CabCompras.findByPk(id);
        if (!foundCabCompras) throw new Error("ID de CabCompras no encontrado");
        let foundDetCompras = await DetCompras.findAll({where:{CabCompraId:id,borradoLogico:false}});
        if (foundDetCompras.length > 0){
            await Promise.all(
                foundDetCompras.map(async (detalle) => {
                    await deleteDetCompras(detalle.id);
                })
            )
        };
        let deletedCabCompras = await foundCabCompras.update({borradoLogico:!foundCabCompras.borradoLogico},{transaction:transactionEliminarCabCompras});
        await transactionEliminarCabCompras.commit();
        console.log('Registro eliminado OK Tabla CabCompras');
        return deletedCabCompras;
    } catch (error) {
        await transactionEliminarCabCompras.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllCabCompras,createCabCompras,deleteCabCompras};