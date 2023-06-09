const {KardexCuentas,DetMovCuentas,Cuentas,Usuario,Personal,EstadoDoc,ConceptoMovC,Bancos, ClienteProveedor, TipoDocIdentidad, TipoCliProv} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            fecha:elem.fecha,
            tipoCambio:elem.tipoCambio,
            moneda:elem.moneda,
            ingEgr:elem.ingEgr,
            saldoIniMN: elem.saldoIniMN,
            saldoIniME:elem.saldoIniME,
            importeMN:elem.importeMN,
            importeME:elem.importeME,
            saldoFinMN:elem.saldoFinMN,
            saldoFinME:elem.saldoFinME,
            DetMovCuentaId:elem.DetMovCuentaId,
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
        console.log(error.message)
    }
};

const getAllKardexCuentas= async ()=>{
    let databaseKardexCuentas = null;
    let apiKardexCuentasRaw = null;
    let apiKardexCuentas = null;
    databaseKardexCuentas = await KardexCuentas.findAll({
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
                    attributes:["descripcion","nroCuenta","Kardex","modena"]
                }]
    });
    if (databaseKardexCuentas.length===0){
        apiKardexCuentasRaw = (await axios.get('http://192.168.18.15:82/kardexCuentas')).data;
        apiKardexCuentas = await cleanArray(apiKardexCuentasRaw);
        await cargaBDKardexCuentas(apiKardexCuentas);
        databaseKardexCuentas = await KardexCuentas.findAll({
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
                        attributes:["descripcion","nroCuenta","Kardex","modena"]
                    }]
        });
    }
    return databaseKardexCuentas;
};

const createKardexCuentas = async (regKardexCuentas)=>{
    const transactionCrearKardexCuentas = await KardexCuentas.sequelize.transaction();
    try {
        let maxIdKardexCuentas = await KardexCuentas.max('id',{transaction:transactionCrearKardexCuentas});
        let newKardexCuentas = await KardexCuentas.create({id:maxIdKardexCuentas+1, ...regKardexCuentas},{transaction:transactionCrearKardexCuentas});
        await transactionCrearKardexCuentas.commit();
        console.log('Registro creado OK Tabla KardexCuentas');
        return newKardexCuentas;
        } catch (error) {
            await transactionCrearKardexCuentas.rollback();
            console.log(error.message);
        };
};

module.exports = {getAllKardexCuentas,createKardexCuentas};