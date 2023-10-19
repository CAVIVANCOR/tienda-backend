const { Op } = require("sequelize");
const {DetVentas,Producto,EstadoProd} = require("../../db");
const axios = require("axios");
const regDetVentasUsuario ={
    where: { borradoLogico: false },
    include:[{
        model:Producto,
        attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto","valorVentaUnitMN","valorVentaUnitME","porcentajeMaxDescConAutorizacion","porcentajeMaxDescSinAutorizacion","porcentajeMaxDescPorCantidad","cantidadAplicaDesc","moneda","noKardex","listaPrecios","costoUnitarioMN","costoUnitarioME"],
    },{
        model:EstadoProd,
        attributes:["descripcion"]
    }]
};
const {where,...regDetVentasAdmin}=regDetVentasUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            cantidad:elem.cantidad,
            vvUnitMN:elem.vvUnitMN,
            vvUnitME:elem.vvUnitME,
            porcentajeDescUnit:elem.porcentajeDescUnit,
            descUnitMN:elem.descUnitMN,
            descUnitME:elem.descUnitME,
            vvNetoUnitMN:elem.vvNetoUnitMN,
            vvNetoUnitME:elem.vvNetoUnitME,
            vvNetoTotMN:elem.vvNetoTotMN,
            vvNetoTotME:elem.vvNetoTotME,
            igvUnitMN:elem.igvUnitMN,
            igvUnitME:elem.igvUnitME,
            igvTotalMN:elem.igvTotalMN,
            igvTotalME:elem.igvTotalME,
            pvUnitMN:elem.pvUnitMN,
            pvUnitME:elem.pvUnitME,
            pvTotalMN:elem.pvTotalMN,
            pvTotalME:elem.pvTotalME,
            exonerado:elem.exonerado,
            descUnitMontoMN:elem.descUnitMontoMN,
            descUnitMontoME:elem.descUnitMontoME,
            nroMesesGarantia:elem.nroMesesGarantia,
            CabVentaId:elem.CabVentaId,
            ProductoId:elem.ProductoId,
            EstadoProdId:elem.EstadoProdId,
            idPreciosCliProv:elem.idPreciosCliProv,
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
    const transactionCrearDetVentas = await DetVentas.sequelize.transaction();
    try {
        let newDetVentas = await DetVentas.create(regDetVentas,{transaction:transactionCrearDetVentas});
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
        console.log("BACKEND-CAVR:"+error.message);
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
                        model:Producto,
                        required:true
                    }]
            });
            console.log("searchDetVentas:Registros encontrados en Tabla DetVentas", foundDetVentas.length);
            return foundDetVentas;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message);
    };
};


module.exports = {getAllDetVentas,createDetVentas,deleteDetVentas, updateDetVentas, searchDetVentas};   