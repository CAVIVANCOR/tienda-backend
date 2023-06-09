const {CabMovAlmacen, DetMovAlmacen, ConceptoAlmacen, CentroCosto, ClienteProveedor, EstadoDoc, CorrelativoDoc, TipoDocumento, TipoCambio, TipoMovAlmacen, Usuario, Personal, Producto} = require("../../db");
const axios = require("axios");
const { deleteDetMovAlmacen } = require("./detMovAlmacenControllers");
const regCabMovAlmacenUsuario = {
    where: { borradoLogico: false },
    include:[{
                model:DetMovAlmacen,
                attributes:["CabMovAlmacenId","ProductoId","EstadoProdId","nroLote","nroEnvase","nroSerie","fechaProduccion","fechaVencimiento","cantidad","valorUnitMN","codUbicacionOrigen","codUbicacionDestino"],
                include:[{
                            model:Producto,
                            attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto"],
                        }]
            },{
                model:ConceptoAlmacen,
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
                model:TipoMovAlmacen,
                attributes:["descripcion","ingreso","salida"]
            },{
                model:Usuario,
                attributes:["usuario"],
                include:[{
                    model:Personal,
                    attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor"]
                }]
            }]
};

const {where,...regCabMovAlmacenAdmin}=regCabMovAlmacenUsuario;

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            fecha:elem.fecha,
            serieDcmto:elem.serieDcmto,
            correlativoDcmto:elem.correlativoDcmto,
            observaciones:elem.observaciones,
            tipoCambio:elem.tipoCambio,
            emailDestino:elem.emailDestino,
            numGuiaSunat:elem.numGuiaSunat,
            fechaGuiaSunat:elem.fechaGuiaSunat,
            ConceptoAlmacenId:elem.ConceptoAlmacenId,
            ClienteProveedorId:elem.ClienteProveedorId,
            EstadoDocId:elem.EstadoDocId,
            CorrelativoDocId:elem.CorrelativoDocId,
            TipoCambioId:elem.TipoCambioId,
            TipoMovAlmacenId:elem.TipoMovAlmacenId,
            UsuarioId:elem.UsuarioId,
            CentroCostoId:elem.CentroCostoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCabMovAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await CabMovAlmacen.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllCabMovAlmacen= async (isAdministrator=false)=>{
    let databaseCabMovAlmacen = null;
    let apiCabMovAlmacenRaw = null;
    let apiCabMovAlmacen = null;
    let regCabMovAlmacen = regCabMovAlmacenUsuario;
    if (isAdministrator) regCabMovAlmacen = regCabMovAlmacenAdmin;
    databaseCabMovAlmacen = await CabMovAlmacen.findAll(regCabMovAlmacen);
    if (databaseCabMovAlmacen.length===0){
        apiCabMovAlmacenRaw = (await axios.get('http://192.168.18.15:82/cabMovAlmacen')).data;
        apiCabMovAlmacen = await cleanArray(apiCabMovAlmacenRaw);
        await cargaBDCabMovAlmacen(apiCabMovAlmacen);
        databaseCabMovAlmacen = await CabMovAlmacen.findAll(regCabMovAlmacen);
    }
    return databaseCabMovAlmacen;
};


const createCabMovAlmacen = async (regCabMovAlmacen) => {
    const transactionCrearCabMovAlmacen = await CabMovAlmacen.sequelize.transaction();
    let detMovAlmacenRecords = null; // Inicializa la variable con un valor predeterminado
    try {
        let maxIdCabMovAlmacen = await CabMovAlmacen.max('id', { transaction: transactionCrearCabMovAlmacen });
        let newCabMovAlmacen = await CabMovAlmacen.create({ id: maxIdCabMovAlmacen + 1, ...regCabMovAlmacen }, { transaction: transactionCrearCabMovAlmacen });
        if (regCabMovAlmacen.DetMovAlmacen) { // Verifica que regCabMovAlmacen.DetMovAlmacen esté definido
            detMovAlmacenRecords = await DetMovAlmacen.bulkCreate(regCabMovAlmacen.DetMovAlmacen, { transaction: transactionCrearCabMovAlmacen });
        }
        await transactionCrearCabMovAlmacen.commit();
        return { newCabMovAlmacen, detMovAlmacenRecords };
    } catch (error) {
        await transactionCrearCabMovAlmacen.rollback();
        throw new Error(error.message);
    };
};

const deleteCabMovAlmacen = async (id) => {
    let transactionEliminarCabMovAlmacen = await CabMovAlmacen.sequelize.transaction();
    try {
        let foundCabMovAlmacen = await CabMovAlmacen.findByPk(id);
        if (!foundCabMovAlmacen) throw new Error("No se encontró el ID del registro a eliminar en la tabla CabMovAlmacen");
        let foundDetMovAlmacen = await DetMovAlmacen.findAll({
            where: { CabMovAlmacenId: id }
        })
        if (foundDetMovAlmacen.length > 0){
            await Promise.all(
                foundDetMovAlmacen.map(async (detalle) => {
                    await deleteDetMovAlmacen(detalle.id, transactionEliminarCabMovAlmacen);
                })
            )
        };
        let deletedCabMovAlmacen = await CabMovAlmacen.update(
            { borradoLogico: !foundAlmacen.borradoLogico },
            { where:{id} },
            { transaction: transactionEliminarCabMovAlmacen },
        )
        await transactionEliminarCabMovAlmacen.commit();
        return deletedCabMovAlmacen;
    } catch (error) {
        await transactionEliminarCabMovAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllCabMovAlmacen,createCabMovAlmacen, deleteCabMovAlmacen};