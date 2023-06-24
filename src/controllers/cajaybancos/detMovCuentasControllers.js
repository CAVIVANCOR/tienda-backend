const {DetMovCuentas,Personal, ConceptoMovC,Bancos, ClienteProveedor,TipoDocIdentidad,TipoCliProv,EstadoDoc,Usuario,KardexCuentas} = require("../../db");
const axios = require("axios");
const regDetMovCuentasUsuario ={
    where: { borradoLogico: false },
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
};
const {where,...regDetMovCuentasAdmin}=regDetMovCuentasUsuario;
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
        throw new Error(error.message);
    }
};

const getAllDetMovCuentas= async (isAdministrator=false)=>{
    let databaseDetMovCuentas = null;
    let apiDetMovCuentasRaw = null;
    let apiDetMovCuentas = null;
    let regDetMovCuentas = regDetMovCuentasUsuario;
    if (isAdministrator) regDetMovCuentas = regDetMovCuentasAdmin;
    databaseDetMovCuentas = await DetMovCuentas.findAll(regDetMovCuentas);
    if (databaseDetMovCuentas.length===0){
        apiDetMovCuentasRaw = (await axios.get('http://192.168.18.15:82/detMovCuentas')).data;
        apiDetMovCuentas = await cleanArray(apiDetMovCuentasRaw);
        await cargaBDDetMovCuentas(apiDetMovCuentas);
        databaseDetMovCuentas = await DetMovCuentas.findAll(regDetMovCuentas);
    }
    return databaseDetMovCuentas;
};

const createDetMovCuentas = async (regDetMovCuentas)=>{
    const transactionCrearDetMovCuentas = await DetMovCuentas.sequelize.transaction();
    try {
        let maxIdDetMovCuentas = await DetMovCuentas.max('id');
        let newDetMovCuentas = await DetMovCuentas.create({id:maxIdDetMovCuentas+1, ...regDetMovCuentas},{transaction:transactionCrearDetMovCuentas});
        await transactionCrearDetMovCuentas.commit();
        console.log('Registro creado OK Tabla DetMovCuentas')
        return newDetMovCuentas;
    } catch (error) {
        await transactionCrearDetMovCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteDetMovCuenta = async (id)=>{
    const transactionEliminarDetMovCuentas = await DetMovCuentas.sequelize.transaction();
    try {
        let foundDetMovCuenta = await DetMovCuentas.findByPk(id);
        if (!foundDetMovCuenta) throw new Error("ID detalle de movimiento de cuentas No encontrado");
        let foundKardexCuentas = await KardexCuentas.findAll({where:{DetMovCuentaId:id}});
        if (foundKardexCuentas.length>0) throw new Error("El detalle de movimiento de cuentas tiene movimientos asociados en Kardex de cuentas");
        let deletedDetMovCuenta = await foundDetMovCuenta.update({borradoLogico:!foundDetMovCuenta.borradoLogico},{transaction:transactionEliminarDetMovCuentas});
        await transactionEliminarDetMovCuentas.commit();
        console.log('Registro borrado OK Tabla DetMovCuentas')
        return deletedDetMovCuenta;
    } catch (error) {
        await transactionEliminarDetMovCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

const updateDetMovCuentas = async (id,regDetMovCuentas)=>{
    const transactionActualizarDetMovCuentas = await DetMovCuentas.sequelize.transaction();
    try {
        let foundDetMovCuenta = await DetMovCuentas.findByPk(id);
        if (!foundDetMovCuenta) throw new Error("ID detalle de movimiento de cuentas No encontrado");
        let updatedDetMovCuenta = await foundDetMovCuenta.update(regDetMovCuentas,{transaction:transactionActualizarDetMovCuentas});
        await transactionActualizarDetMovCuentas.commit();
        console.log('Registro actualizado OK Tabla DetMovCuentas')
        return updatedDetMovCuenta;
    } catch (error) {
        await transactionActualizarDetMovCuentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

module.exports = {getAllDetMovCuentas,createDetMovCuentas,deleteDetMovCuenta, updateDetMovCuentas};