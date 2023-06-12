const {KardexAlmacen, DetMovAlmacen,CabMovAlmacen,Producto,EstadoProd,ClienteProveedor,TipoDocIdentidad,TipoCliProv} = require("../../db");
const axios = require("axios");
const regKardexAlmacenUsuario ={
    include:[{
                model:DetMovAlmacen,
                attributes:["CabMovAlmacenId","ProductoId","EstadoProdId","nroLote","nroEnvase","nroSerie","fechaProduccion","fechaVencimiento","cantidad","valorUnitMN","codUbicacionOrigen","codUbicacionDestino"],
                include:[{
                    model:Producto,
                    attributes:["descripcion","codigoProveedor","modeloFabricante","urlFotoProducto"],
                },{
                    model:CabMovAlmacen,
                    attributes:["fecha","serieDcmto","correlativoDcmto"],
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
                    }]
                },{
                    model:EstadoProd,
                    attributes:["descripcion"]
                }]
            }]
};
const {where,...regKardexAlmacenAdmin}=regKardexAlmacenUsuario;

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            fecha:elem.fecha,
            ingEgr:elem.ingEgr,
            saldoIniCant:elem.saldoIniCant,
            saldoIniCUnit:elem.saldoIniCUnit,
            saldoIniCTot:elem.saldoIniCTot,
            cantidad:elem.cantidad,
            valorUnit:elem.valorUnit,
            valorTot:elem.valorUnitMN,
            saldoFinCant:elem.saldoFinCant,
            saldoFinCUnit:elem.saldoFinCUnit,
            saldoFinCTot:elem.saldoFinCTot,
            saldoIniCantEmp:elem.saldoIniCantEmp,
            saldoFinCantEmp:elem.saldoFinCantEmp,
            idHistorico:elem.id,
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
        )
        return 
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
        databaseKardexAlmacen = await KardexAlmacen.findAll(regKardexAlmacen);
    }
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
                DetMovAlmacenId:idDetMovAlmacen
            }
        });
        if (!foundKardexaAlmacen) throw new Error("ID Detalle Movimiento no se encuentra en la Tabla Kardex Almacen");
        let deletedKardexAlmacen = await foundKardexaAlmacen.destroy({transaction:transactionEliminarKardexAlmacen});
        await transactionEliminarKardexAlmacen.commit();
        console.log('Registro eliminado OK Tabla Kardex Almacen');
        return deletedKardexAlmacen;
    } catch (error) {
        await transactionEliminarKardexAlmacen.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllKardexAlmacen,createKardexAlmacen, deleteKardexAlmacen};