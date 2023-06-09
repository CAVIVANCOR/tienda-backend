const {DetMovCuentas,Personal, ConceptoMovC,Bancos, ClienteProveedor,TipoDocIdentidad,TipoCliProv,EstadoDoc,Usuario} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            fecha:elem.fecha,
            tipoCambio:elem.tipoCambio,
            moneda:elem.moneda,
            importe:elem.importe,
            nroTransaccion: elem.nroTransaccion,
            idDocOrigen:elem.idDocOrigen,
            fechaDocOrigen:elem.fechaDocOrigen,
            ClienteProveedorId: elem.ClienteProveedorId,
            UsuarioId: elem.UsuarioId,
            EstadoDocId: elem.EstadoDocId,
            ConceptoMovCId:elem.ConceptoMovCId,
            BancoId:elem.BancoId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDDetMovCuentas = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await DetMovCuentas.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllDetMovCuentas= async ()=>{
    let databaseDetMovCuentas = null;
    let apiDetMovCuentasRaw = null;
    let apiDetMovCuentas = null;
    databaseDetMovCuentas = await DetMovCuentas.findAll({
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
    });
    if (databaseDetMovCuentas.length===0){
        apiDetMovCuentasRaw = (await axios.get('http://192.168.18.15:82/detMovCuentas')).data;
        apiDetMovCuentas = await cleanArray(apiDetMovCuentasRaw);
        await cargaBDDetMovCuentas(apiDetMovCuentas);
        databaseDetMovCuentas = await DetMovCuentas.findAll({
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
        });
    }
    return databaseDetMovCuentas;
};

const createDetMovCuentas = async (regDetMovCuentas)=>{
    const transactionCrearDetMovCuentas = await DetMovCuentas.sequelize.transaction();
    try {
        let maxIdDetMovCuentas = await DetMovCuentas.max('id',{transaction:transactionCrearDetMovCuentas});
        let newDetMovCuentas = await DetMovCuentas.create({id:maxIdDetMovCuentas+1, ...regDetMovCuentas},{transaction:transactionCrearDetMovCuentas});
        await transactionCrearDetMovCuentas.commit();
        console.log('Registro creado OK Tabla DetMovCuentas')
        return newDetMovCuentas;
    } catch (error) {
        await transactionCrearDetMovCuentas.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllDetMovCuentas,createDetMovCuentas};