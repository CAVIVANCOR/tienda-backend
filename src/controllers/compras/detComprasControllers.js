const {DetCompras,CabCompras,Producto,EstadoProd,PreciosCliProv,FormaPago,CentroCosto, ClienteProveedor, EstadoDoc, TipoDocumento, TipoCambio, Usuario, Personal} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            cantidad:elem.cantidad,
            vcUnitMN:elem.vcUnitMN,
            vcUnitME:elem.vcUnitME,
            porcentajeDescUnit:elem.porcentajeDescUnit,
            descUnitMN:elem.descUnitMN,
            descUnitME:elem.descUnitME,
            vcNetoUnitMN:elem.vcNetoUnitMN,
            vcNetoUnitME:elem.vcNetoUnitME,
            vcNetoTotMN:elem.vcNetoTotMN,
            vcNetoTotME:elem.vcNetoTotME,
            igvUnitMN:elem.igvUnitMN,
            igvUnitME:elem.igvUnitME,
            igvTotalMN:elem.igvTotalMN,
            igvTotalME:elem.igvTotalME,
            pcUnitMN:elem.pcUnitMN,
            pcUnitME:elem.pcUnitME,
            pcTotalMN:elem.pcTotalMN,
            pcTotalME:elem.pcTotalME,
            exonerado:elem.exonerado,
            descUnitMontoMN:elem.descUnitMontoMN,
            descUnitMontoME:elem.descUnitMontoME,
            nroMesesGarantia:elem.nroMesesGarantia,
            CabCompraId:elem.CabCompraId,
            ProductoId:elem.ProductoId,
            EstadoProdId:elem.EstadoProdId,
            PreciosCliProvId:elem.PreciosCliProvId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDDetCompras = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await DetCompras.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllDetCompras= async ()=>{
    let databaseDetCompras = null;
    let apiDetComprasRaw = null;
    let apiDetCompras = null;
    databaseDetCompras = await DetCompras.findAll({
        include:[{
                    model:CabCompras,
                    attributes:["id","fecha","serieDcmto","correlativoDcmto","idContacto","idDirOrigen","idDirEntrega","observaciones","idDocAlmacen","tipoCambio","porcentajeIGV","emailDestino","rutaDcmtoPDF","exonerado","moneda","anticipo","ClienteProveedorId","FormaPagoId","EstadoDocId","UsuarioId","TipoCambioId","CentroCostoId","TipoDocumentoId"],
                    include:[{
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
                },{
                    model:Producto,
                    attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto","valorVentaUnitMN","valorVentaUnitME","porcentajeMaxDescConAutorizacion","porcentajeMaxDescSinAutorizacion","porcentajeMaxDescPorCantidad","cantidadAplicaDesc","moneda","noKardex","listaPrecios","costoUnitarioMN","costoUnitarioME"],
                },{
                    model:EstadoProd,
                    attributes:["descripcion"]
                },{
                    model:PreciosCliProv,
                    attributes:["id","fechaDesde","fechaHasta","moneda","valorVentaUnit"]
                }]
    });
    if (databaseDetCompras.length===0){
        apiDetComprasRaw = (await axios.get('http://192.168.18.15:82/detCompras')).data;
        apiDetCompras = await cleanArray(apiDetComprasRaw);
        await cargaBDDetCompras(apiDetCompras);
        databaseDetCompras = await DetCompras.findAll({
            include:[{
                        model:CabCompras,
                        attributes:["id","fecha","serieDcmto","correlativoDcmto","idContacto","idDirOrigen","idDirEntrega","observaciones","idDocAlmacen","tipoCambio","porcentajeIGV","emailDestino","rutaDcmtoPDF","exonerado","moneda","anticipo","ClienteProveedorId","FormaPagoId","EstadoDocId","UsuarioId","TipoCambioId","CentroCostoId","TipoDocumentoId"],
                        include:[{
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
                    },{
                        model:Producto,
                        attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto","valorVentaUnitMN","valorVentaUnitME","porcentajeMaxDescConAutorizacion","porcentajeMaxDescSinAutorizacion","porcentajeMaxDescPorCantidad","cantidadAplicaDesc","moneda","noKardex","listaPrecios","costoUnitarioMN","costoUnitarioME"],
                    },{
                        model:EstadoProd,
                        attributes:["descripcion"]
                    },{
                        model:PreciosCliProv,
                        attributes:["id","fechaDesde","fechaHasta","moneda","valorVentaUnit"]
                    }]
        });
    }
    return databaseDetCompras;
};

const createDetCompras = async (regDetCompras)=>{
    const transactionCrearDetCompras = await DetCompras.sequelize.transaction();
    try {
        await DetCompras.sequelize.query('Lock Table DetCompras',{transaction:transactionCrearDetCompras});
        let maxIdDetCompras = await DetCompras.max('id',{transaction:transactionCrearDetCompras});
        let newDetCompras = await DetCompras.create({id:maxIdDetCompras.id+1, ...regDetCompras}, {transaction:transactionCrearDetCompras});
        await transactionCrearDetCompras.commit();
        console.log('Registro creado OK Tabla DetCompras');
        return newDetCompras;
    } catch (error) {
        await transactionCrearDetCompras.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllDetCompras,createDetCompras};