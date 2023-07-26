const {DetCompras,CabCompras,Producto,EstadoProd,PreciosCliProv,FormaPago,CentroCosto, ClienteProveedor, EstadoDoc, TipoDocumento, TipoCambio, Usuario, Personal} = require("../../db");
const axios = require("axios");
const regDetComprasUsuario ={
    where: { borradoLogico: false },
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
};
const {where,...regDetComprasAdmin}=regDetComprasUsuario;
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
            idPreciosCliProv:elem.idPreciosCliProv,
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllDetCompras= async (isAdministrator=false)=>{
    let databaseDetCompras = null;
    let apiDetComprasRaw = null;
    let apiDetCompras = null;
    let regDetCompras = regDetComprasUsuario;
    if (isAdministrator) regDetCompras = regDetComprasAdmin;
    databaseDetCompras = await DetCompras.findAll(regDetCompras);
    if (databaseDetCompras.length===0){
        apiDetComprasRaw = (await axios.get('http://192.168.18.15:82/detCompras')).data;
        apiDetCompras = await cleanArray(apiDetComprasRaw);
        await cargaBDDetCompras(apiDetCompras);
        databaseDetCompras = await DetCompras.findAll(regDetCompras);
    }
    return databaseDetCompras;
};

const createDetCompras = async (regDetCompras)=>{
    let transactionCrearDetCompras = await DetCompras.sequelize.transaction();
    try {
        //await DetCompras.sequelize.query('Lock Table DetCompras',{transaction:transactionCrearDetCompras});
        let maxIdDetCompras = await DetCompras.max('id');
        let newDetCompras = await DetCompras.create({id:maxIdDetCompras.id+1, ...regDetCompras}, {transaction:transactionCrearDetCompras});
        await transactionCrearDetCompras.commit();
        console.log('Registro creado OK Tabla DetCompras');
        return newDetCompras;
    } catch (error) {
        await transactionCrearDetCompras.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteDetCompras = async (id)=>{
    let transactionEliminarDetCompras = await DetCompras.sequelize.transaction();
    try {
        let foundDetCompras = await DetCompras.findByPk(id);
        if (!foundDetCompras) throw new Error("No se encontro el ID del registro en Detalle Compras");
        let deletedDetCompras = await foundDetCompras.update({borradoLogico:!foundDetCompras.borradoLogico},{transaction:transactionEliminarDetCompras});
        await transactionEliminarDetCompras.commit();
        console.log('Registro eliminado OK Tabla DetCompras');
        return deletedDetCompras;
    } catch (error) {
        await transactionEliminarDetCompras.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateDetCompras = async (id,regDetCompras)=>{
    let transactionActualizarDetCompras = await DetCompras.sequelize.transaction();
    try {
        let foundDetCompras = await DetCompras.findByPk(id);
        if (!foundDetCompras) throw new Error("No se encontro el ID del registro en Detalle Compras");
        let updatedDetCompras = await foundDetCompras.update(regDetCompras,{transaction:transactionActualizarDetCompras});
        await transactionActualizarDetCompras.commit();
        console.log('Registro actualizado OK Tabla DetCompras');
        return updatedDetCompras;
    } catch (error) {
        await transactionActualizarDetCompras.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchDetCompras = async (search)=>{
    try {
        let buscar = {};
        if (search.fecha !== undefined) {
            buscar['$CabCompras.fecha$'] = { [Op.eq]: search.fecha };
            delete search.fecha;
        };
        if (search.fechaInicial !== undefined && search.fechaFinal !== undefined) {
            buscar['$CabCompras.fecha$'] = { [Op.between]: [search.fechaInicial, search.fechaFinal] };
            delete search.fechaInicial;
            delete search.fechaFinal;
        } else if (search.fechaInicial !== undefined) {
            buscar['$CabCompras.fecha$'] = { [Op.gte]: search.fechaInicial };
            delete search.fechaInicial;
        } else if (search.fechaFinal !== undefined) {
            buscar['$CabCompras.fecha$'] = { [Op.lte]: search.fechaFinal };
            delete search.fechaFinal;
        };
        if (search.razonSocial !== undefined) {
            buscar['$CabCompras.ClienteProveedor.razonSocial$'] = { [Op.like]: `%${search.razonSocial}%` };
            delete search.razonSocial;
        };
        if (search.descripcion !== undefined) {
            buscar['$Producto.descripcion$'] = { [Op.like]: `%${search.descripcion}%` };
            delete search.descripcion;
        };
        if (search.codigoProveedor !== undefined) {
            buscar['$Producto.codigoProveedor$'] = { [Op.like]: `%${search.codigoProveedor}%` };
            delete search.codigoProveedor;
        };
        if (search.cantidad !== undefined) {
            buscar.cantidad = { [Op.gt]: search.cantidad };
        };
        for (let [key,value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        }
        let foundDetCompras = await DetCompras.findAll({
            where: buscar,
            include: [{
                        model: CabCompras,
                        required:true,
                        include:[{
                                    model: ClienteProveedor,
                                    required:true,
                                }
                        ]
                    },{
                        model:Producto,
                        required:true
                    }]
            });
            console.log("searchDetCompras:Registros encontrados en Tabla DetCompras",foundDetCompras, foundDetCompras.length);
            return foundDetCompras;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    };
};


module.exports = {getAllDetCompras,createDetCompras,deleteDetCompras, updateDetCompras, searchDetCompras};