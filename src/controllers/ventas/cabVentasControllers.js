const {CabVentas, DetVentas,CorrelativoDoc,Producto,FormaPago,CentroCosto, ClienteProveedor, EstadoDoc, TipoDocumento, TipoCambio, Usuario, Personal} = require("../../db");
const axios = require("axios");

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
            idVendedor:elem.idVendedor,
            idTecnico:elem.idTecnico,
            numPlacas:elem.numPlacas,
            tipoCambio:elem.tipoCambio,
            porcentajeIGV:elem.porcentajeIGV,
            emailDestino:elem.emailDestino,
            rutaDcmtoPDF:elem.rutaDcmtoPDF,
            exonerado:elem.exonerado,
            moneda:elem.moneda,
            factElectOK:elem.factElectOK,
            anticipo:elem.anticipo,
            ClienteProveedorId:elem.ClienteProveedorId,
            FormaPagoId:elem.FormaPagoId,
            EstadoDocId:elem.EstadoDocId,
            UsuarioId:elem.UsuarioId,
            TipoCambioId:elem.TipoCambioId,
            CentroCostoId:elem.CentroCostoId,
            CorrelativoDocId:elem.CorrelativoDocId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCabVentas = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await CabVentas.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllCabVentas= async ()=>{
    let databaseCabVentas = null;
    let apiCabVentasRaw = null;
    let apiCabVentas = null;
    databaseCabVentas = await CabVentas.findAll({
        include:[{
                    model:DetVentas,
                    attributes:["id","cantidad","vcUnitMN","vcUnitME","porcentajeDescUnit","descUnitMN","descUnitME","vcNetoUnitMN","vcNetoUnitME","vcNetoTotMN","vcNetoTotME","igvUnitMN","igvUnitME","igvTotalMN","igvTotalME","pvUnitMN","pvUnitME","pvTotalMN","pvTotalME","rutaFotoInstalacion01","rutaFotoInstalacion02","exonerado","idApruebaDesc","fechaApruebaDesc","descUnitMontoMN","descUnitMontoME","nroMesesGarantia","ProductoId","EstadoProdId","PreciosCliProvId"],
                    include:[{
                        model:Producto,
                        attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto"],
                    }]
                },{
                    model:FormaPago,
                    attributes:["descripcion","codAlmacenOrigen","codAlmacenDestino","prioridad"]
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
                    model:CorrelativoDoc,
                    attributes:["serie","correlativo","nroCeros"],
                    include:[{
                        model:TipoDocumento,
                        attributes:["descripcion","iniciales","codSunat"]
                    }]
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
    });
    if (databaseCabVentas.length===0){
        apiCabVentasRaw = (await axios.get('http://192.168.18.15:82/cabVentas')).data;
        apiCabVentas = await cleanArray(apiCabVentasRaw);
        await cargaBDCabVentas(apiCabVentas);
        databaseCabVentas = await CabVentas.findAll({
            include:[{
                        model:DetVentas,
                        attributes:["id","cantidad","vcUnitMN","vcUnitME","porcentajeDescUnit","descUnitMN","descUnitME","vcNetoUnitMN","vcNetoUnitME","vcNetoTotMN","vcNetoTotME","igvUnitMN","igvUnitME","igvTotalMN","igvTotalME","pvUnitMN","pvUnitME","pvTotalMN","pvTotalME","rutaFotoInstalacion01","rutaFotoInstalacion02","exonerado","idApruebaDesc","fechaApruebaDesc","descUnitMontoMN","descUnitMontoME","nroMesesGarantia","ProductoId","EstadoProdId","PreciosCliProvId"],
                        include:[{
                            model:Producto,
                            attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto"],
                        }]
                    },{
                        model:FormaPago,
                        attributes:["descripcion","codAlmacenOrigen","codAlmacenDestino","prioridad"]
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
                        model:CorrelativoDoc,
                        attributes:["serie","correlativo","nroCeros"],
                        include:[{
                            model:TipoDocumento,
                            attributes:["descripcion","iniciales","codSunat"]
                        }]
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
        });
    }
    return databaseCabVentas;
};

const createCabVentas = async (regCabVentas)=>{
    const transactionCrearCabVentas = await CabVentas.sequelize.transaction();
    try {
        await CabVentas.sequelize.query('Lock Table CabVentas',{transaction:transactionCrearCabVentas});
        let maxIdCabVentas = await CabVentas.max('id',{transaction:transactionCrearCabVentas});
        let newCabVentas = await CabVentas.create({id:maxIdCabVentas+1, ...regCabVentas}, {transaction:transactionCrearCabVentas});
        await DetVentas.bulkCreate(regCabVentas.DetVentas, {transaction:transactionCrearCabVentas});
        await transactionCrearCabVentas.commit();
        return newCabVentas;
    } catch (error) {
        await transactionCrearCabVentas.rollback();
        console.log(error.message);
    };
}

module.exports = {getAllCabVentas,createCabVentas};