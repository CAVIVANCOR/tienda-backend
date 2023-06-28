const {DetVentas,CabVentas,CorrelativoDoc,Producto,EstadoProd,PreciosCliProv,FormaPago,CentroCosto, ClienteProveedor, EstadoDoc, TipoDocumento, TipoCambio, Usuario, Personal} = require("../../db");
const axios = require("axios");
const regDetVentasUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:CabVentas,
        attributes:["id","fecha","serieDcmto","correlativoDcmto","idContacto","idDirOrigen","idDirEntrega","observaciones","idDocAlmacen","idVendedor","idTecnico","numPlacas","tipoCambio","porcentajeIGV","emailDestino","rutaDcmtoPDF","exonerado","moneda","factElectOK","anticipo","ClienteProveedorId","FormaPagoId","EstadoDocId","UsuarioId","TipoCambioId","CentroCostoId","CorrelativoDocId"],
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
const {where,...regDetVentasAdmin}=regDetVentasUsuario;
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

const cargaBDDetVentas = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await DetVentas.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllDetVentas= async (isAdministrator=false)=>{
    let databaseDetVentas = null;
    let apiDetVentasRaw = null;
    let apiDetVentas = null;
    let regDetVentas = regDetVentasUsuario;
    if (isAdministrator) regDetVentas = regDetVentasAdmin;
    databaseDetVentas = await DetVentas.findAll(regDetVentas);
    if (databaseDetVentas.length===0){
        apiDetVentasRaw = (await axios.get('http://192.168.18.15:82/detVentas')).data;
        apiDetVentas = await cleanArray(apiDetVentasRaw);
        await cargaBDDetVentas(apiDetVentas);
        databaseDetVentas = await DetVentas.findAll(regDetVentas);
    }
    return databaseDetVentas;
};

const createDetVentas = async (regDetVentas)=>{
    const transactionCrearDetVentas = await DetVentas.create(regDetVentas);
    try {
        await DetVentas.sequelize.query('Lock Table DetVentas',{transaction:transactionCrearDetVentas});
        let maxIdDetVentas = await DetVentas.max("id");
        let newDetVentas = await DetVentas.create({id:maxIdDetVentas+1},{transaction:transactionCrearDetVentas});
        await transactionCrearDetVentas.commit();
        console.log('Registro creado OK Tabla DetVentas');
        return newDetVentas;
    } catch (error) {
        await transactionCrearDetVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteDetVentas = async (id)=>{
    let transactionEliminarDetVentas = await DetVentas.sequelize.transaction();
    try {
        let foundDetVentas = await DetVentas.findByPk(id);
        if (!foundDetVentas) throw new Error("No se encontro el ID del registro en Detalle Ventas");
        let deletedDetVentas = await foundDetVentas.update({borradoLogico:!foundDetVentas.borradoLogico},{transaction:transactionEliminarDetVentas});
        await transactionEliminarDetVentas.commit();
        console.log('Registro eliminado OK Tabla DetVentas');
        return deletedDetVentas;
    } catch (error) {
        await transactionEliminarDetVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateDetVentas = async (id,regDetVentas)=>{
    let transactionActualizarDetVentas = await DetVentas.sequelize.transaction();
    try {
        let foundDetVentas = await DetVentas.findByPk(id);
        if (!foundDetVentas) throw new Error("No se encontro el ID del registro en Detalle Ventas");
        let updatedDetVentas = await foundDetVentas.update(regDetVentas,{transaction:transactionActualizarDetVentas});
        await transactionActualizarDetVentas.commit();
        console.log('Registro actualizado OK Tabla DetVentas');
        return updatedDetVentas;
    } catch (error) {
        await transactionActualizarDetVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchDetVentas = async (search)=>{
    try {
        let buscar = {};
        if (search.fecha !== undefined) {
            buscar['$CabVentas.fecha$'] = { [Op.eq]: search.fecha };
            delete search.fecha;
        };
        if (search.fechaInicial !== undefined && search.fechaFinal !== undefined) {
            buscar['$CabVentas.fecha$'] = { [Op.between]: [search.fechaInicial, search.fechaFinal] };
            delete search.fechaInicial;
            delete search.fechaFinal;
        } else if (search.fechaInicial !== undefined) {
            buscar['$CabVentas.fecha$'] = { [Op.gte]: search.fechaInicial };
            delete search.fechaInicial;
        } else if (search.fechaFinal !== undefined) {
            buscar['$CabVentas.fecha$'] = { [Op.lte]: search.fechaFinal };
            delete search.fechaFinal;
        };
        if (search.razonSocial !== undefined) {
            buscar['$CabVentas.ClienteProveedor.razonSocial$'] = { [Op.like]: `%${search.razonSocial}%` };
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
        let foundDetVentas = await DetVentas.findAll({
            where: buscar,
            include: [{
                        model: CabVentas,
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
            console.log("searchDetVentas:Registros encontrados en Tabla DetVentas",foundDetVentas, foundDetVentas.length);
            return foundDetVentas;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    };
};


module.exports = {getAllDetVentas,createDetVentas,deleteDetVentas, updateDetVentas, searchDetVentas};   