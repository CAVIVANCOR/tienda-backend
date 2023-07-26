const moment = require("moment/moment");
const {KardexAlmacen, CabMovAlmacen, Almacen,UbicaAlmacen,DetMovAlmacen,ConceptoAlmacen,Producto,EstadoProd,ClienteProveedor,TipoDocIdentidad,TipoCliProv, sequelize} = require("../../db");
const axios = require("axios");
const { Op, Sequelize, QueryTypes } = require("sequelize");
const regKardexAlmacenUsuario ={
    include:[{
                model:Producto,
                attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto"],
            },{
                model:ClienteProveedor,
                attributes:["id","razonSocial","numDocIdentidad","TipoDocIdentidadId","TipoCliProvId"],
                include:[{
                            model:TipoDocIdentidad,
                            attributes:["descripcion"]
                        },{
                            model:TipoCliProv,
                            attributes:["descripcion","clienteProveedor"]
                }]
            },{
                model:EstadoProd,
                attributes:["descripcion"]
            },{
                model: UbicaAlmacen,
                attributes:["descripcionArmada"],
                include:[{
                    model:Almacen,
                    attributes:["descripcion","kardex","direccion"]
                }]
    }]
};
const {where,...regKardexAlmacenAdmin}=regKardexAlmacenUsuario;

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        elem.saldoIniCant = (typeof elem.saldoIniCant !== "number") ? 0 :elem.saldoIniCant;
        elem.ingCUnit = (typeof elem.ingCUnit !== "number") ? 0 :elem.ingCUnit;
        elem.cantidad = (typeof elem.cantidad !== "number") ? 0 :elem.cantidad;
        elem.saldoIniCUnit = (typeof elem.saldoIniCUnit !== "number") ? 0 :elem.saldoIniCUnit;
        elem.saldoIniCTot = (typeof elem.saldoIniCTot !== "number") ? 0 :elem.saldoIniCTot;
        elem.saldoFinCant = (typeof elem.saldoFinCant !== "number") ? 0 :elem.saldoFinCant;
        elem.saldoFinCUnit = (typeof elem.saldoFinCUnit !== "number") ? 0 :elem.saldoFinCUnit;
        elem.saldoFinCTot = (typeof elem.saldoFinCTot !== "number") ? 0 :elem.saldoFinCTot;
        elem.saldoIniCantEmp = (typeof elem.saldoIniCantEmp !== "number") ? 0 :elem.saldoIniCantEmp;
        elem.saldoFinCantEmp = (typeof elem.saldoFinCantEmp !== "number") ? 0 :elem.saldoFinCantEmp;
        elem.saldoFinCUnit = (typeof elem.saldoFinCUnit !== "number") ? 0 :elem.saldoFinCUnit;
        // console.log("elem.fechaProduccion",elem.fechaProduccion);
        // console.log("elem.fechaVencimiento",elem.fechaVencimiento);
        const fechaProduccion = (elem.fechaProduccion && elem.fechaProduccion !== '0000-00-00T00:00:00.000Z' && moment(elem.fechaProduccion).isValid()) ? moment(elem.fechaProduccion).toDate() : null;
        const fechaVencimiento = (elem.fechaVencimiento && elem.fechaVencimiento !== '0000-00-00T00:00:00.000Z' && moment(elem.fechaVencimiento).isValid()) ? moment(elem.fechaVencimiento).toDate() : null;
        // console.log("fechaProduccion",fechaProduccion);
        // console.log("fechaVencimiento",fechaVencimiento);
        return {
            fecha:elem.fecha,
            ingEgr:elem.ingEgr,
            saldoIniCant:elem.saldoIniCant,
            ingCUnit:elem.ingCUnit,
            cantidad:elem.cantidad,
            saldoIniCUnit:elem.saldoIniCUnit,
            saldoIniCTot:elem.saldoIniCTot,
            saldoFinCant:elem.saldoFinCant,
            saldoFinCUnit:elem.saldoFinCUnit,
            saldoFinCTot:elem.saldoFinCTot,
            idAlmacen:elem.idAlmacen,
            idCabMovAlmacen:elem.idCabMovAlmacen,
            idDetMovAlmacen:elem.idDetMovAlmacen,
            saldoIniCantEmp:elem.saldoIniCantEmp,
            saldoFinCantEmp:elem.saldoFinCantEmp,
            nroEnvase:elem.nroEnvase,
            nroLote:elem.nroLote,
            nroSerie:elem.nroSerie,
            // fechaProduccion:fechaProduccion,
            // fechaVencimiento:fechaVencimiento,
            ProductoId:elem.ProductoId,
            ClienteProveedorId:elem.ClienteProveedorId,
            UbicaAlmacenId:elem.UbicaAlmacenId,
            EstadoProdId:elem.EstadoProdId,
        };
    });
    return clean;
};

const cargaBDKardexAlmacen = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await KardexAlmacen.create(element);
            })
        );
        console.log("Concluyo con Exito cargaBDKardexAlmacen")
        return true;
    } catch (error) {
        console.log(error.message)
    }
};

const getAllKardexAlmacen= async (isAdministrator=false)=>{
    let databaseKardexAlmacen = null;
    let apiKardexAlmacenRaw = null;
    let apiKardexAlmacen = null;
    let regKardexAlmacen = regKardexAlmacenUsuario;
    if (isAdministrator) regKardexAlmacen = regKardexAlmacenAdmin;
    databaseKardexAlmacen = await KardexAlmacen.findAll(regKardexAlmacen);
    if (databaseKardexAlmacen.length===0){
        apiKardexAlmacenRaw = (await axios.get('http://192.168.18.15:82/kardexAlmacen')).data;
        apiKardexAlmacen = await cleanArray(apiKardexAlmacenRaw);
        await cargaBDKardexAlmacen(apiKardexAlmacen);
        // let dataEncontrada = await searchKardexAlmacen({codigoProveedor:"CAVR130772"})
        // console.log("dataEncontrada",dataEncontrada);
        // let dataEncontrada2 = await searchKardexAlmacen({codigoProveedor:"CAVR130772lñdklñfasdk"})
        // console.log("dataEncontrada2",dataEncontrada2);
        // let dataEncontrada3 = await searchKardexAlmacen({codigoProveedor:"CAVR130772", fechaInicial:"2016-01-01", fechaFinal:"2019-12-19"});
        // console.log("dataEncontrada3",dataEncontrada3);
        // let dataEncontrada4 = await searchKardexAlmacen({codigoProveedor:"CAVR130772", fechaInicial:"2016-01-01"});
        // console.log("dataEncontrada4",dataEncontrada4);
        // let dataEncontrada5 = await searchKardexAlmacen({codigoProveedor:"CAVR130772",  fechaFinal:"2019-12-19"});
        // console.log("dataEncontrada5",dataEncontrada5);
      //  await regeneraKardexAlmacen(396582, 11, 7);
      //  await regeneraKardexAlmacen(723240, 4, 7718);
      //  await regeneraKardexAlmacen(811195, 8, 5233);
        //console.log("result regeneraKardexAlmacen",result.kardexGeneradoOrigen,result.kardexGeneradoDestino);
        databaseKardexAlmacen = await KardexAlmacen.findAll(regKardexAlmacen);
    };
    console.log("Concluyo getAllKardexAlmacen")
    return databaseKardexAlmacen;
};

const createKardexAlmacen = async (regKardexAlmacen)=>{
    const transactionCrearKardexAlmacen = await KardexAlmacen.sequelize.transaction();
    try {
        let maxIdKardexAlmacen = await KardexAlmacen.max('id');
        let newKardexAlmacen = await KardexAlmacen.create({id:maxIdKardexAlmacen+1,...regKardexAlmacen},{transaction:transactionCrearKardexAlmacen});
        await transactionCrearKardexAlmacen.commit();
        console.log('Registro creado OK Tabla Kardex Almacen');
        return newKardexAlmacen
    } catch (error) {
        await transactionCrearKardexAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteKardexAlmacen = async (idDetMovAlmacen)=>{
    let transactionEliminarKardexAlmacen = await KardexAlmacen.sequelize.transaction();
    try {
        let foundKardexaAlmacen = await KardexAlmacen.findAll({
            where:{
                idDetMovAlmacen:idDetMovAlmacen
            }
        });
        if (foundKardexaAlmacen.length===0) throw new Error("ID Detalle Movimiento no se encuentra en la Tabla Kardex Almacen");
        let deletedKardexAlmacen = await Promise.all(
            foundKardexaAlmacen.map(async(element)=>{
                return await element.destroy({transaction:transactionEliminarKardexAlmacen});
            })
        )
        await transactionEliminarKardexAlmacen.commit();
        console.log('Registro eliminado OK Tabla Kardex Almacen');
        return deletedKardexAlmacen;
    } catch (error) {
        await transactionEliminarKardexAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const obtenerStockPorAlmacenes = async (kardexAlmacenResults) => {
  const stockPorAlmacenesMap = new Map();
  const idsAlmacen = [...new Set(kardexAlmacenResults.map(registro => registro.idAlmacen))];
  const descripcionesAlmacen = await obtenerDescripcionesAlmacen(idsAlmacen);
  kardexAlmacenResults.forEach((registro) => {
    const { idAlmacen, saldoFinCant } = registro;
    stockPorAlmacenesMap.set(idAlmacen, +saldoFinCant);
  });
  const stockPorAlmacenes = Array.from(stockPorAlmacenesMap.entries()).map(([almacen, stock]) => ({ almacen: +almacen, stock: +stock }));
  stockPorAlmacenes.forEach((objeto) => {
    const descripcionAlmacen = descripcionesAlmacen.get(objeto.almacen);
    objeto.descripcion = descripcionAlmacen || ""; // Si no hay descripción, asignar una cadena vacía
  });
  return stockPorAlmacenes;
};
const obtenerDescripcionesAlmacen = async (idsAlmacen) => {
  const descripcionesAlmacen = new Map();
  for (const id of idsAlmacen) {
    const almacen = await Almacen.findByPk(id);
    if (almacen) {
      descripcionesAlmacen.set(id, almacen.descripcion);
    }
  }
  return descripcionesAlmacen;
};

const consultaStocks = async ({idAlmacen, ProductoId,fechaInicio,fechaFin}) => {
  //console.log("consultaStocks",idAlmacen, ProductoId,fechaInicio,fechaFin);
  try {
    let where = {};
    where.ProductoId = ProductoId;
    if (fechaInicio) {
      where.fecha = {
        [Op.gte]: fechaInicio
      };
      if (fechaFin) {
        where.fecha[Op.lte] = fechaFin;
      }
    } else if (fechaFin) {
      where.fecha = {
        [Op.lte]: fechaFin
      };
    }
    if (idAlmacen) {
      where.idAlmacen = idAlmacen;
    }
   // console.log("consultaStocks where",where);
    let kardexAlmacenResults = await KardexAlmacen.findAll({
      where,
      include: [{
                  model: UbicaAlmacen,
                  required:true,
                },{
                  model:Producto,
                  required:true
                }],
      order: [
        ['idAlmacen', 'ASC'],
        ['ProductoId', 'ASC'],
        ['nroLote', 'ASC'],
        ['nroEnvase', 'ASC'],
        ['nroSerie', 'ASC'],
        ['fechaProduccion', 'ASC'],
        ['fechaVencimiento', 'ASC'],
        ['UbicaAlmacenId', 'ASC'],
        ['EstadoProdId', 'ASC'],
        ['fecha', 'ASC'],
        ['ingEgr', 'DESC'],
        ['idDetMovAlmacen', 'ASC']
      ]
    });
    let stockPorAlmacenes = await obtenerStockPorAlmacenes(kardexAlmacenResults);
   // console.log("Concluyo con Exito la Consulta de Stocks", kardexAlmacenResults.length, stockPorAlmacenes);
    return stockPorAlmacenes;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  };
};

const busquedaKardexAlmacen = async (tipoConsulta, ProductoId, fechaInicio, fechaFin, idAlmacen, nroLote, nroEnvase, nroSerie, fechaProduccion, fechaVencimiento, idUbicacionFisica, idEstadoProducto) => {
    try {
      //**  Para realizar el Kardex por Almacen y Producto */
      let where = {};
      where.ProductoId = ProductoId;
      if (fechaInicio) {
        where.fecha = {
          [Op.gte]: fechaInicio
        };
        if (fechaFin) {
          where.fecha[Op.lte] = fechaFin;
        }
      } else if (fechaFin) {
        where.fecha = {
          [Op.lt]: fechaFin
        };
      }
      if (idAlmacen) {
        where.idAlmacen = idAlmacen;
      }
      //** Para realizar el Kardex por Nro Lote, Envase, Serie, Fecha Produccion, Fecha Vencimiento, Ubicacion Fisica, Estado Producto */
      if (!tipoConsulta) { 
        if (nroLote) {
          where.nroLote = {
            [Op.like]: `%${nroLote}%`
          };
        }
        if (nroEnvase) {
          where.nroEnvase = {
            [Op.like]: `${nroEnvase}%`
          };
        }
        if (nroSerie) {
          where.nroSerie = {
            [Op.like]: `%${nroSerie}%`
          };
        }
        if (fechaProduccion) {
          where.fechaProduccion = fechaProduccion;
        }
        if (fechaVencimiento) {
          where.fechaVencimiento = fechaVencimiento;
        }
        if (idUbicacionFisica) {
          where.UbicaAlmacenId = idUbicacionFisica;
        }
        if (idEstadoProducto) {
          where.EstadoProdId = idEstadoProducto;
        }
      };
      let kardexAlmacenResults = await KardexAlmacen.findAll({
        where,
        order: [
          ['idAlmacen', 'ASC'],
          ['ProductoId', 'ASC'],
          ['nroLote', 'ASC'],
          ['nroEnvase', 'ASC'],
          ['nroSerie', 'ASC'],
          ['fechaProduccion', 'ASC'],
          ['fechaVencimiento', 'ASC'],
          ['UbicaAlmacenId', 'ASC'],
          ['EstadoProdId', 'ASC'],
          ['fecha', 'ASC'],
          ['ingEgr', 'DESC'],
          ['idDetMovAlmacen', 'ASC']
        ]
      });
      console.log("Concluyo Busqueda Kardex Almacen",tipoConsulta, ProductoId, fechaInicio, fechaFin, idAlmacen, nroLote, nroEnvase, nroSerie, fechaProduccion, fechaVencimiento, idUbicacionFisica, idEstadoProducto);
      return kardexAlmacenResults;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };
  

const generaSaldosKardexProducto = async (regKardexgenerado)=>{
    let transactionGeneraSaldosKardexProducto = await KardexAlmacen.sequelize.transaction();
    let tipoBusquedaKardex = true;
    try {
      foundProducto = await Producto.findByPk(regKardexgenerado.ProductoId);
      for (let i = 0; i < 2; i++) {
        if (i===1) tipoBusquedaKardex = false;
        let [foundKardexaAlmacenSI, foundKardexaAlmacenSF,] = await Promise.all([
          busquedaKardexAlmacen(
            tipoBusquedaKardex,
            regKardexgenerado.ProductoId,
            null,
            regKardexgenerado.fecha,
            regKardexgenerado.idAlmacen,
            regKardexgenerado.nroLote,
            regKardexgenerado.nroEnvase,
            regKardexgenerado.nroSerie,
            regKardexgenerado.fechaProduccion,
            regKardexgenerado.fechaVencimiento,
            regKardexgenerado.UbicaAlmacenId,
            regKardexgenerado.EstadoProdId
            ),
          busquedaKardexAlmacen(tipoBusquedaKardex,
            regKardexgenerado.ProductoId,
            regKardexgenerado.fecha,
            null,
            regKardexgenerado.idAlmacen,
            regKardexgenerado.nroLote,
            regKardexgenerado.nroEnvase,
            regKardexgenerado.nroSerie,
            regKardexgenerado.fechaProduccion,
            regKardexgenerado.fechaVencimiento,
            regKardexgenerado.UbicaAlmacenId,
            regKardexgenerado.EstadoProdId
            )
        ]);
        let lastIndex = 0;
        let saldoCantidad = 0;
        let costoPromUnitario = 0;
        let costoTotal = 0;
        let costoUnitUltCompra = 0;
        if (foundKardexaAlmacenSI.length>0){
          lastIndex = foundKardexaAlmacenSI.length - 1;
          saldoCantidad = foundKardexaAlmacenSI[lastIndex].saldoFinCant === null ? 0 : (+foundKardexaAlmacenSI[lastIndex].saldoFinCant);
          costoPromUnitario = foundKardexaAlmacenSI[lastIndex].saldoFinCUnit === null ? 0 : (+foundKardexaAlmacenSI[lastIndex].saldoFinCUnit);
          costoTotal = foundKardexaAlmacenSI[lastIndex].saldoFinCTot === null ? 0 : (+foundKardexaAlmacenSI[lastIndex].saldoFinCTot);  
        };
        await Promise.all(foundKardexaAlmacenSF.map(async (kardex) => {
          kardex.saldoIniCant = (+saldoCantidad).toFixed(2);
          kardex.saldoIniCUnit = (+costoPromUnitario).toFixed(2);
          kardex.saldoIniCTot = (+costoTotal).toFixed(2);
          if (kardex.ingEgr) {
              saldoCantidad = (+saldoCantidad) + (+kardex.cantidad);
              if ((+kardex.ingCUnit) > 0){
                costoUnitUltCompra= (+kardex.ingCUnit).toFixed(2);
                costoPromUnitario = ((+kardex.saldoIniCTot) + ((+kardex.ingCUnit) * (+kardex.cantidad))) / (+saldoCantidad);
                costoTotal= (+costoPromUnitario) * (+saldoCantidad);
              } else {
                costoPromUnitario = ((+kardex.saldoIniCTot) + ((+kardex.saldoIniCUnit) * (+kardex.cantidad))) / (+saldoCantidad);
                costoTotal= (+costoPromUnitario) * (+saldoCantidad);
              }
            } else {
              kardex.ingCUnit = 0;
              saldoCantidad = (+saldoCantidad) - (+kardex.cantidad);
              if ((+saldoCantidad)>0){
                costoPromUnitario = ((+kardex.saldoIniCTot) - ((+kardex.saldoIniCUnit) * (+kardex.cantidad))) / (+saldoCantidad);
                costoTotal= (+costoPromUnitario) * (+saldoCantidad);
              } else if ((+saldoCantidad)===0){
                costoTotal= (+costoPromUnitario) * (+saldoCantidad);
              } else {
                costoPromUnitario = ((+kardex.saldoIniCTot) - ((+kardex.saldoIniCUnit) * (+kardex.cantidad))) / (+saldoCantidad);
                costoTotal= (+costoPromUnitario) * (+saldoCantidad);
              }
            }
            kardex.saldoFinCant = (+saldoCantidad).toFixed(2);
            kardex.saldoFinCUnit = (+costoPromUnitario).toFixed(2);
            kardex.saldoFinCTot = (+costoTotal).toFixed(2);
            await kardex.save({ transaction: transactionGeneraSaldosKardexProducto });
        }));
        if (((+costoUnitUltCompra) > 0) && foundProducto && tipoBusquedaKardex===true) {
          await foundProducto.update({ costoUnitarioMN: (+costoUnitUltCompra) },{ transaction: transactionGeneraSaldosKardexProducto });
        };
      };
      await transactionGeneraSaldosKardexProducto.commit();
      console.log("Concluyo Calculo Saldos Kardex Almacen");
      return true;
    } catch (error) {
        await transactionGeneraSaldosKardexProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const regeneraKardexAlmacen = async (idDetMovAlmacen, idConceptoAlmacen, idClienteProveedor)=>{
    let transactionRegeneraKardexAlmacen = await KardexAlmacen.sequelize.transaction();
    let createdKardexAlmacenOrigen = null;
    let createdKardexAlmacenDestino = null;
    let regDetMovAlmacen = null;
    let regCabMovAlmacen = null;
    let foundConceptoAlmacen = null;
    let foundAlmacenOrigen = null;
    let foundAlmacenDestino = null;
    let kardexGeneradoOrigen = null;
    let kardexGeneradoDestino = null;
    try {
        let deletedKardex = await deleteKardexAlmacen(idDetMovAlmacen);
        if (deletedKardex){
            regDetMovAlmacen = await DetMovAlmacen.findByPk(idDetMovAlmacen);
            if (!regDetMovAlmacen) throw new Error("ID Detalle Movimiento no se encuentra en la Tabla Detalle Movimiento");
            regCabMovAlmacen = await CabMovAlmacen.findByPk(regDetMovAlmacen.CabMovAlmacenId);
            if (!regCabMovAlmacen) throw new Error("ID Cabecera Movimiento no se encuentra en la Tabla Cabecera Movimiento");
            foundConceptoAlmacen = await ConceptoAlmacen.findByPk(idConceptoAlmacen);
            if (!foundConceptoAlmacen) throw new Error("ID Concepto Almacen no se encuentra en la Tabla Concepto Almacen");
            foundAlmacenOrigen = await Almacen.findByPk(foundConceptoAlmacen.codAlmacenOrigen);
            foundAlmacenDestino = await Almacen.findByPk(foundConceptoAlmacen.codAlmacenDestino);
            if (!foundAlmacenDestino) throw new Error("ID Almacen Destino no se encuentra en la Tabla Almacen");
            if (!foundAlmacenOrigen) throw new Error("ID Almacen Origen no se encuentra en la Tabla Almacen");
            if (foundAlmacenOrigen.kardex){
                createdKardexAlmacenOrigen = await KardexAlmacen.create({
                    fecha:regCabMovAlmacen.fecha,
                    ingEgr:false,
                    saldoIniCant:0,
                    saldoIniCUnit:0,
                    saldoIniCTot:0,
                    cantidad:regDetMovAlmacen.cantidad,
                    saldoFinCant:0,
                    saldoFinCUnit:0,
                    saldoFinCTot:0,
                    ingCUnit:0,
                    idAlmacen:foundAlmacenOrigen.id,
                    idCabMovAlmacen:regDetMovAlmacen.CabMovAlmacenId,
                    idDetMovAlmacen:regDetMovAlmacen.id,
                    nroLote:regDetMovAlmacen.nroLote,
                    nroEnvase:regDetMovAlmacen.nroEnvase,
                    nroSerie:regDetMovAlmacen.nroSerie,
                    fechaProduccion:regDetMovAlmacen.fechaProduccion,
                    fechaVencimiento:regDetMovAlmacen.fechaVencimiento,
                    ProductoId:regDetMovAlmacen.ProductoId,
                    ClienteProveedorId:idClienteProveedor,
                    UbicaAlmacenId:regDetMovAlmacen.codUbicacionOrigen,
                    EstadoProdId:regDetMovAlmacen.EstadoProdId,
                    },{transaction:transactionRegeneraKardexAlmacen});
                // console.log("Concluyo Creacion de Kardex Almacen Origen",createdKardexAlmacenOrigen.toJSON())
            };
            if (foundAlmacenDestino.kardex){
                createdKardexAlmacenDestino = await KardexAlmacen.create({
                    fecha:regCabMovAlmacen.fecha,
                    ingEgr:true,
                    saldoIniCant:0,
                    saldoIniCUnit:0,
                    saldoIniCTot:0,
                    cantidad:regDetMovAlmacen.cantidad,
                    ingCUnit:regDetMovAlmacen.valorUnitMN,
                    saldoFinCant:0,
                    saldoFinCUnit:0,
                    saldoFinCTot:0,
                    idAlmacen:foundAlmacenDestino.id,
                    idCabMovAlmacen:regDetMovAlmacen.CabMovAlmacenId,
                    idDetMovAlmacen:regDetMovAlmacen.id,
                    nroLote:regDetMovAlmacen.nroLote,
                    nroEnvase:regDetMovAlmacen.nroEnvase,
                    nroSerie:regDetMovAlmacen.nroSerie,
                    fechaProduccion:regDetMovAlmacen.fechaProduccion,
                    fechaVencimiento:regDetMovAlmacen.fechaVencimiento,
                    ProductoId:regDetMovAlmacen.ProductoId,
                    ClienteProveedorId:idClienteProveedor,
                    UbicaAlmacenId:regDetMovAlmacen.codUbicacionDestino,
                    EstadoProdId:regDetMovAlmacen.EstadoProdId,
                    },{transaction:transactionRegeneraKardexAlmacen});
                // console.log("Concluyo Creacion de Kardex Almacen Destino",createdKardexAlmacenDestino.toJSON());
            };
        } else throw new Error("No se completo la eliminación de los Registros del kardex");
        await transactionRegeneraKardexAlmacen.commit();
        if (foundAlmacenOrigen.kardex){
          kardexGeneradoOrigen = await generaSaldosKardexProducto(createdKardexAlmacenOrigen)
        };
        if (foundAlmacenDestino.kardex){
            kardexGeneradoDestino = await generaSaldosKardexProducto(createdKardexAlmacenDestino)
        };
        console.log('Concluyo Regeneracion de Kardex Almacen',idDetMovAlmacen, idConceptoAlmacen, idClienteProveedor);
        return {kardexGeneradoOrigen,kardexGeneradoDestino};
    } catch (error) {
        await transactionRegeneraKardexAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};


const searchKardexAlmacen = async (search)=>{
  try {
    let buscar = {};
    if (search.razonSocial !== undefined) {
      buscar['$ClienteProveedor.razonSocial$'] = { [Op.like]: `%${search.razonSocial}%` };
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
    let foundKardexAlmacen = await KardexAlmacen.findAll({
        where: buscar,
        include: [{
                    model: ClienteProveedor,
                    required:true,
                },{
                    model:Producto,
                    required:true
                }]
        });
    return foundKardexAlmacen.length;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  };
};

module.exports = {getAllKardexAlmacen,createKardexAlmacen, deleteKardexAlmacen, regeneraKardexAlmacen, searchKardexAlmacen, consultaStocks};