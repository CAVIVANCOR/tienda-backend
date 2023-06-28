const {CabVentas, DetVentas,CorrelativoDoc,Producto,FormaPago,CentroCosto, ClienteProveedor, EstadoDoc, TipoDocumento, TipoCambio, Usuario, Personal} = require("../../db");
const axios = require("axios");
const { deleteDetVentas } = require("./detVentasControllers");
const regCabVentasUsuario ={
    where: { borradoLogico: false },
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
};
const {where,...regCabVentasAdmin}=regCabVentasUsuario;
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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllCabVentas= async (isAdministrator=false)=>{
    let databaseCabVentas = null;
    let apiCabVentasRaw = null;
    let apiCabVentas = null;
    let regCabVentas = regCabVentasUsuario;
    if (isAdministrator) regCabVentas = regCabVentasAdmin;
    databaseCabVentas = await CabVentas.findAll(regCabVentas);
    if (databaseCabVentas.length===0){
        apiCabVentasRaw = (await axios.get('http://192.168.18.15:82/cabVentas')).data;
        apiCabVentas = await cleanArray(apiCabVentasRaw);
        await cargaBDCabVentas(apiCabVentas);
        databaseCabVentas = await CabVentas.findAll(regCabVentas);
    }
    return databaseCabVentas;
};

const createCabVentas = async (regCabVentas)=>{
    const transactionCrearCabVentas = await CabVentas.sequelize.transaction();
    try {
        await CabVentas.sequelize.query('Lock Table CabVentas',{transaction:transactionCrearCabVentas});
        let maxIdCabVentas = await CabVentas.max('id');
        let newCabVentas = await CabVentas.create({id:maxIdCabVentas+1, ...regCabVentas}, {transaction:transactionCrearCabVentas});
        await DetVentas.bulkCreate(regCabVentas.DetVentas, {transaction:transactionCrearCabVentas});
        await transactionCrearCabVentas.commit();
        return newCabVentas;
    } catch (error) {
        await transactionCrearCabVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

const deleteCabVentas = async (id)=>{
    let transactionEliminarCabVentas = await CabVentas.sequelize.transaction();
    try {
        let foundCabVentas = await CabVentas.findByPk(id);
        if (!foundCabVentas) throw new Error('ID de CabVentas no encontrado');
        let foundDetVentas = await DetVentas.findAll({where:{CabVentaId:id,borradoLogico:false}});
        if (foundDetVentas.length > 0){
            await Promise.all(
                foundDetVentas.map(async (detalle) => {
                    await deleteDetVentas(detalle.id);
                })
            )
        };
        let deletedCabVentas = await foundCabVentas.update({borradoLogico:!foundCabVentas.borradoLogico},{transaction:transactionEliminarCabVentas});
        console.log('Registro eliminado OK Tabla CabVentas');
        return deletedCabVentas;
    } catch (error) {
        await transactionEliminarCabVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateCabVentas = async (id,regCabVentas)=>{
    let transactionActualizarCabVentas = await CabVentas.sequelize.transaction();
    try {
        let foundCabVentas = await CabVentas.findByPk(id);
        if (!foundCabVentas) throw new Error('ID de CabVentas no encontrado');
        let updatedCabVentas = await foundCabVentas.update(regCabVentas, {transaction:transactionActualizarCabVentas});
        console.log('Registro actualizado OK Tabla CabVentas');
        return updatedCabVentas;
    } catch (error) {
        await transactionActualizarCabVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchByCabVentas= async (search)=>{
    try {
        let buscar = {};
        if (search.razonSocial !== undefined) {
            buscar['$ClienteProveedor.razonSocial$'] = { [Op.like]: `%${search.razonSocial}%` };
            delete search.razonSocial;
        };
        if (search.nombreComercial !== undefined) {
            buscar['$ClienteProveedor.nombreComercial$'] = { [Op.like]: `%${search.nombreComercial}%` };
            delete search.nombreComercial;
        };
        if (search.numDocIdentidad !== undefined) {
            buscar['$ClienteProveedor.numDocIdentidad$'] = { [Op.eq]: search.numDocIdentidad };
            delete search.numDocIdentidad;
        };
        if (search.lineaCreditoMN !== undefined) {
            buscar['$ClienteProveedor.lineaCreditoMN$'] = { [Op.gt]: search.lineaCreditoMN };
            delete search.lineaCreditoMN;
        };
        if (search.fecha !== undefined) {
            buscar.fecha = { [Op.eq]: search.fecha };
            delete search.fecha;
        };
        if (search.fechaInicial !== undefined && search.fechaFinal !== undefined) {
            buscar.fecha = { [Op.between]: [search.fechaInicial, search.fechaFinal] };
            delete search.fechaInicial;
            delete search.fechaFinal;
        } else if (search.fechaInicial !== undefined) {
            buscar.fecha = { [Op.gte]: search.fechaInicial };
            delete search.fechaInicial;
        } else if (search.fechaFinal !== undefined) {
            buscar.fecha = { [Op.lte]: search.fechaFinal };
            delete search.fechaFinal;
        };
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsCabVentas = await CabVentas.findAll({
            where: buscar,
            include: [{
                model: ClienteProveedor,
                required: true
            },{
                model: CentroCosto,
                required: true
            },{
                model: EstadoDoc,
                required: true
            },{
                model: Usuario,
                required: true
            },{
                model: TipoCambio,
                required: true
            },{
                model: CorrelativoDoc,
                required: true
            },{
                model: FormaPago,
                required: true
            }]
        });
        console.log("searchByCabVentas:Registros encontrados en Tabla CabVentas",foundRegsCabVentas, foundRegsCabVentas.length);
        return foundRegsCabVentas;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
        
    }
};

module.exports = {getAllCabVentas,createCabVentas,deleteCabVentas, updateCabVentas, searchByCabVentas};