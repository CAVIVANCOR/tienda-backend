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

const searchDetMovCuentas = async (search)=>{
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
        let foundRegsDetMovCuentas = await DetMovCuentas.findAll({
            where: {
                    [Op.and]: buscar,
                    include: [{
                                model: ClienteProveedor,
                                required: true
                            },{
                                model: ConceptoMovC,
                                required: true
                            },{
                                model: EstadoDoc,
                                required: true
                            },{
                                model: Bancos,
                                required: true
                            }]
                    }
            });
        console.log("searchDetMovCuentas:Registros encontrados en Tabla DetMovCuentas",foundRegsDetMovCuentas, foundRegsDetMovCuentas.length);
        return foundRegsDetMovCuentas;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};


module.exports = {getAllDetMovCuentas,createDetMovCuentas,deleteDetMovCuenta, updateDetMovCuentas, searchDetMovCuentas};