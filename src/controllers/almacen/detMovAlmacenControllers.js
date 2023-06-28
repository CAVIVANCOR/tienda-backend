const {DetMovAlmacen,CabMovAlmacen,Producto,EstadoProd, KardexAlmacen, ClienteProveedor} = require("../../db");
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
            id:elem.id,
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
    };
};

const updateDetMovAlmacen = async (id,regDetMovAlmacen)=>{
    let transactionActualizarDetMovAlmacen = await DetMovAlmacen.sequelize.transaction();
    try {
        let foundDetMovAlmacen = await DetMovAlmacen.findByPk(id);
        if (!foundDetMovAlmacen) throw new Error("No se encontro el ID del registro en Detalle Movimientos de Almacen");
        let updatedDetMovAlmacen = await foundDetMovAlmacen.update(regDetMovAlmacen,{transaction:transactionActualizarDetMovAlmacen});
        await transactionActualizarDetMovAlmacen.commit();
        console.log('Registro actualizado OK Tabla DetMovAlmacen')
        return updatedDetMovAlmacen;
    } catch (error) {
        await transactionActualizarDetMovAlmacen.rollback();
        console.log(error.message)
        throw new Error(error.message);
    };
};

const searchDetMovAlmacen = async (search)=>{
    try {
        let buscar = {};
        if (search.fecha !== undefined) {
            buscar['$CabMovAlmacen.fecha$'] = { [Op.eq]: search.fecha };
            delete search.fecha;
        };
        if (search.fechaInicial !== undefined && search.fechaFinal !== undefined) {
            buscar['$CabMovAlmacen.fecha$'] = { [Op.between]: [search.fechaInicial, search.fechaFinal] };
            delete search.fechaInicial;
            delete search.fechaFinal;
        } else if (search.fechaInicial !== undefined) {
            buscar['$CabMovAlmacen.fecha$'] = { [Op.gte]: search.fechaInicial };
            delete search.fechaInicial;
        } else if (search.fechaFinal !== undefined) {
            buscar['$CabMovAlmacen.fecha$'] = { [Op.lte]: search.fechaFinal };
            delete search.fechaFinal;
        };
        if (search.razonSocial !== undefined) {
            buscar['$CabMovAlmacen.ClienteProveedor.razonSocial$'] = { [Op.like]: `%${search.razonSocial}%` };
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
        if (search.fechaProduccion !== undefined) {
            buscar.fechaProduccion = { [Op.eq]: search.fechaProduccion };
            delete search.fechaProduccion;
        };
        if (search.fechaProduccionInicial !== undefined && search.fechaProduccionFinal !== undefined) {
            buscar.fechaProduccion = { [Op.between]: [search.fechaProduccionInicial, search.fechaProduccionFinal] };
            delete search.fechaProduccionInicial;
            delete search.fechaProduccionFinal;
        } else if (search.fechaProduccionInicial !== undefined) {
            buscar.fechaProduccion = { [Op.gte]: search.fechaProduccionInicial };
            delete search.fechaProduccionInicial;
        } else if (search.fechaProduccionFinal !== undefined) {
            buscar.fechaProduccion = { [Op.lte]: search.fechaProduccionFinal };
            delete search.fechaProduccionFinal;
        };
        if (search.fechaVencimiento !== undefined) {
            buscar.fechaVencimiento = { [Op.eq]: search.fechaVencimiento };
            delete search.fechaVencimiento;
        };
        if (search.fechaVencimientoInicial !== undefined && search.fechaVencimientoFinal !== undefined) {
            buscar.fechaVencimiento = { [Op.between]: [search.fechaVencimientoInicial, search.fechaVencimientoFinal] };
            delete search.fechaVencimientoInicial;
            delete search.fechaVencimientoFinal;
        } else if (search.fechaVencimientoInicial !== undefined) {
            buscar.fechaVencimiento = { [Op.gte]: search.fechaVencimientoInicial };
            delete search.fechaVencimientoInicial;
        } else if (search.fechaVencimientoFinal !== undefined) {
            buscar.fechaVencimiento = { [Op.lte]: search.fechaVencimientoFinal };
            delete search.fechaVencimientoFinal;
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
        let foundDetMovAlmacen = await DetMovAlmacen.findAll({
            where: buscar,
            include: [{
                        model: CabMovAlmacen,
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
            console.log("searchDetMovAlmacen:Registros encontrados en Tabla DetMovAlmacen",foundDetMovAlmacen, foundDetMovAlmacen.length);
            return foundDetMovAlmacen;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    };
};

module.exports = {getAllDetMovAlmacen,createDetMovAlmacen,deleteDetMovAlmacen, updateDetMovAlmacen , searchDetMovAlmacen };