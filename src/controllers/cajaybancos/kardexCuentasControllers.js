const {KardexCuentas,DetMovCuentas,Cuentas,Usuario,Personal,EstadoDoc,ConceptoMovC,Bancos, ClienteProveedor, TipoDocIdentidad, TipoCliProv} = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");

let regKardexCuentasUsuario ={
    include:[{
                model:DetMovCuentas,
                attributes:["fecha","tipoCambio","moneda","importe","nroTransaccion","idDocOrigen","fechaDocOrigen","ClienteProveedorId","UsuarioId","EstadoDocId","ConceptoMovCId","BancoId"],
                include:[{
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
                            model:EstadoDoc,
                            attributes:["descripcion"]
                        },{
                            model:Usuario,
                            attributes:["usuario"],
                            include:[{
                                model:Personal,
                                attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor","TipoDocIdentidadId"]
                            }]
                        },{
                            model:ConceptoMovC,
                            attributes:["descripcion","idCuentaOrigen","idCuentaDestino","prioridad"],
                        },{
                            model:Bancos,
                            attributes:["descripcion"]
                        }]
            },{
                model:Cuentas,
                attributes:["descripcion","nroCuenta","kardex","moneda"]
            }]
};
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            fecha:elem.fecha,
            tipoCambio:elem.tipoCambio,
            moneda:elem.moneda,
            ingEgr:elem.ingEgr,
            saldoIniMN:0,
            saldoIniME:0,
            importe:elem.importe,
            saldoFinMN:0,
            saldoFinME:0,
            DetMovCuentaId:elem.DetMovCuentaId,
            CuentaId:elem.CuentaId,
        };
    });
    return clean;
};

const cargaBDKardexCuentas = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await KardexCuentas.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllKardexCuentas= async ()=>{
    let databaseKardexCuentas = null;
    let apiKardexCuentasRaw = null;
    let apiKardexCuentas = null;
    databaseKardexCuentas = await KardexCuentas.findAll(regKardexCuentasUsuario);
    if (databaseKardexCuentas.length===0){
        apiKardexCuentasRaw = (await axios.get('http://192.168.18.15:82/kardexCuentas')).data;
        apiKardexCuentas = await cleanArray(apiKardexCuentasRaw);
        await cargaBDKardexCuentas(apiKardexCuentas);
        let result = await regeneraKardexCuentas(3112);
        // await regeneraKardexAlmacen(723240, 4, 7718);
        // await regeneraKardexAlmacen(811195, 8, 5233);
        //console.log("result regeneraKardexCuentas",result.kardexGeneradoOrigen,result.kardexGeneradoDestino);
        databaseKardexCuentas = await KardexCuentas.findAll(regKardexCuentasUsuario);
    }
    return databaseKardexCuentas;
};

const createKardexCuentas = async (regKardexCuentas)=>{
    const transactionCrearKardexCuentas = await KardexCuentas.sequelize.transaction();
    try {
        let maxIdKardexCuentas = await KardexCuentas.max('id');
        let newKardexCuentas = await KardexCuentas.create({id:maxIdKardexCuentas+1, ...regKardexCuentas},{transaction:transactionCrearKardexCuentas});
        await transactionCrearKardexCuentas.commit();
        console.log('Registro creado OK Tabla KardexCuentas');
        return newKardexCuentas;
        } catch (error) {
            await transactionCrearKardexCuentas.rollback();
            console.log(error.message);
            throw new Error(error.message);
        };
};

// const deleteKardexCuentas = async (idDetMovCuenta)=>{
//     const transactionEliminarKardexCuentas = await KardexCuentas.sequelize.transaction();
//     try {
//         const destroyedRows = await KardexCuentas.destroy({where: {DetMovCuentaId: idDetMovCuenta}}, {transaction: transactionEliminarKardexCuentas});
//         if (destroyedRows === 0) {
//           throw new Error('No existe el ID de Detalle Movimiento Cuenta a eliminar en KardexCuentas');
//         } else {
//           await transactionEliminarKardexCuentas.commit();
//           console.log('Registros eliminados OK en Tabla KardexCuentas');
//           return destroyedRows;
//         }
//     } catch (error) {
//         await transactionEliminarKardexCuentas.rollback();
//         console.log(error.message);
//         throw new Error(error.message);
//     };
// };


const deleteKardexCuentas = async (idDetMovCuenta)=>{
    let transactionEliminarKardexCuentas = await KardexCuentas.sequelize.transaction();
    try {
        let foundKardexaCuentas = await KardexCuentas.findAll({
            where:{
                DetMovCuentaId:idDetMovCuenta
            }
        });
        if (foundKardexaCuentas.length===0) throw new Error("ID Detalle Movimiento no se encuentra en la Tabla Kardex Cuentas");
        let deletedKardexCuentas = await Promise.all(
            foundKardexaCuentas.map(async(element)=>{
                return await element.destroy({transaction:transactionEliminarKardexCuentas});
            })
        )
        await transactionEliminarKardexCuentas.commit();
        console.log('Registros eliminados OK en Tabla KardexCuentas');
        return deletedKardexCuentas;
    } catch (error) {
        await transactionEliminarKardexCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};


const busquedaKardexCuentas = async (CuentaId, fechaInicio, fechaFin) => {
    try {
      let where = {};
        where.CuentaId = CuentaId;
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
      let kardexCuentasResults = await KardexCuentas.findAll({
        where,
        order: [
          ['CuentaId', 'ASC'],
          ['fecha', 'ASC'],
          ['ingEgr', 'DESC'],
          ['DetMovCuentaId', 'ASC']
        ]
      });
      console.log("Concluyo Busqueda Kardex Cuentas",CuentaId, fechaInicio, fechaFin);
      return kardexCuentasResults;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };
  

const generaSaldosKardexCuentas = async (regKardexgenerado)=>{
    let transactionGeneraSaldosKardexCuentas = await KardexCuentas.sequelize.transaction();
    try {
        let [
            foundKardexCuentasSI,
            foundKardexCuentasSF
            ] = await Promise.all([
                busquedaKardexCuentas(regKardexgenerado.CuentaId,null,regKardexgenerado.fecha),
                busquedaKardexCuentas(regKardexgenerado.CuentaId,regKardexgenerado.fecha,null)
                ]);
        let lastIndex = 0;
        let saldoImporte = 0;
        if (foundKardexCuentasSI.length>0){
          lastIndex = foundKardexCuentasSI.length - 1;
          saldoImporte = foundKardexCuentasSI[lastIndex].saldoFin === null ? 0 : (+foundKardexCuentasSI[lastIndex].saldoFin);
        }
        await Promise.all(foundKardexCuentasSF.map(async (kardex) => {
            kardex.saldoIni = (+saldoImporte).toFixed(2);
            if (kardex.ingEgr) {
                saldoImporte = (+saldoImporte) + (+kardex.importe);
            } else {
              saldoImporte = (+saldoImporte) - (+kardex.importe);
            }
            kardex.saldoFin = (+saldoImporte).toFixed(2);
            await kardex.save({ transaction: transactionGeneraSaldosKardexCuentas });
          }));
        await transactionGeneraSaldosKardexCuentas.commit();
        console.log("Concluyo Calculo Saldos Kardex Cuentas");
        return foundKardexCuentasSF;
    } catch (error) {
        await transactionGeneraSaldosKardexCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const regeneraKardexCuentas = async (idDetMovCuenta)=>{
    let transactionRegeneraKardexCuentas = await KardexCuentas.sequelize.transaction();
    let createdKardexCuentasOrigen = null;
    let createdKardexCuentasDestino = null;
    let regDetMovCuentas = null;
    let foundConceptoMovCuentas = null;
    let foundCuentaOrigen = null;
    let foundCuentaDestino = null;
    let kardexGeneradoOrigen = null;
    let kardexGeneradoDestino = null;
    try {
        let deletedKardex = await deleteKardexCuentas(idDetMovCuenta);
        if (deletedKardex){
            regDetMovCuentas = await DetMovCuentas.findByPk(idDetMovCuenta);
            if (!regDetMovCuentas) throw new Error("ID no se encuentra en la Tabla Detalle Movimiento Cuentas");
            foundConceptoMovCuentas = await ConceptoMovC.findByPk(regDetMovCuentas.ConceptoMovCId);
            if (!foundConceptoMovCuentas) throw new Error("ID no se encuentra en la Tabla Concepto Movimientos Cuentas");
            foundCuentaOrigen = await Cuentas.findByPk(foundConceptoMovCuentas.idCuentaOrigen);
            if (!foundCuentaOrigen) throw new Error("ID Origen no se encuentra en la Tabla Cuentas");
            foundCuentaDestino = await Cuentas.findByPk(foundConceptoMovCuentas.idCuentaDestino);
            if (!foundCuentaDestino) throw new Error("ID Destino no se encuentra en la Tabla Cuentas");
            if (foundCuentaOrigen.kardex){
                createdKardexCuentasOrigen = await KardexCuentas.create({
                    fecha:regDetMovCuentas.fecha,
                    tipoCambio:regDetMovCuentas.tipoCambio,
                    moneda:regDetMovCuentas.moneda,
                    ingEgr:false,
                    saldoIni:0,
                    importe:regDetMovCuentas.importe,
                    saldoFin:0,
                    CuentaId:foundCuentaOrigen.id,
                    DetMovCuentaId:regDetMovCuentas.id,
                    },{transaction:transactionRegeneraKardexCuentas});
            };
            if (foundCuentaDestino.kardex){
                createdKardexCuentasDestino = await KardexCuentas.create({
                    fecha:regDetMovCuentas.fecha,
                    tipoCambio:regDetMovCuentas.tipoCambio,
                    moneda:regDetMovCuentas.moneda,
                    ingEgr:true,
                    saldoIni:0,
                    importe:regDetMovCuentas.importe,
                    saldoFin:0,
                    CuentaId:foundCuentaDestino.id,
                    DetMovCuentaId:regDetMovCuentas.id,
                    },{transaction:transactionRegeneraKardexCuentas});
            };
        } else throw new Error("No se completo la eliminación de los Registros del kardex");
        await transactionRegeneraKardexCuentas.commit();
        if (foundCuentaOrigen.kardex){
            kardexGeneradoOrigen = await generaSaldosKardexCuentas(createdKardexCuentasOrigen)
        };
        if (foundCuentaDestino.kardex){
            kardexGeneradoDestino = await generaSaldosKardexCuentas(createdKardexCuentasDestino)
        };
        console.log('Concluyo Regeneracion de Kardex Cuentas',idDetMovCuenta);
        return {kardexGeneradoOrigen,kardexGeneradoDestino};
    } catch (error) {
        await transactionRegeneraKardexCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchKardexCuentas = async (search)=>{
    try {
        let buscar = {};
        if (search.nroTransaccion !== undefined) {
            buscar['$DetMovCuentas.nroTransaccion$'] = { [Op.like]: `%${search.nroTransaccion}%` };
            delete search.nroTransaccion;
        };
        if (search.razonSocial !== undefined) {
            buscar['$DetMovCuentas.ClienteProveedor.razonSocial$'] = { [Op.like]: `%${search.razonSocial}%` };
            delete search.razonSocial;
        };
        if (search.numDocIdentidad !== undefined) {
            buscar['$DetMovCuentas.ClienteProveedor.numDocIdentidad$'] = { [Op.eq]: search.numDocIdentidad };
            delete search.numDocIdentidad;
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
        let foundRegsKardexCuentas = await KardexCuentas.findAll({
            where: {
                    [Op.and]: buscar,
                    include: [{
                                model: Cuentas,
                                required: true
                            },{
                                model: DetMovCuentas,
                                required: true,
                                include:[{
                                    model: ClienteProveedor,
                                    required: true
                                }]
                            }]
                    }
            });
            console.log("searchDetMovCuentas:Registros encontrados en Tabla DetMovCuentas",foundRegsKardexCuentas, foundRegsKardexCuentas.length);
            return foundRegsKardexCuentas;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

module.exports = {getAllKardexCuentas,createKardexCuentas, deleteKardexCuentas, regeneraKardexCuentas, searchKardexCuentas};