const {ClienteProveedor,DirCliProv,Distrito} = require("../../db");
const axios = require("axios");
const {Op}=require("sequelize");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            razonSocial:elem.razonSocial,
            nombreComercial:elem.nombreComercial,
            TipoDocIdentidadId:elem.TipoDocIdentidadId,
            numDocIdentidad:elem.numDocIdentidad,
            monedaLineaCredito:elem.monedaLineaCredito,
            monedaMontoAplicaDesc:elem.monedaMontoAplicaDesc,
            lineaCreditoMN:elem.lineaCreditoMN,
            lineaCreditoME:elem.lineaCreditoME,
            saldoAnticiposMN:elem.saldoAnticiposMN,
            saldoAnticiposME:elem.saldoAnticiposME,
            porcentajeDesc:elem.porcentajeDesc,
            montoAplicaDescMN:elem.montoAplicaDescMN,
            montoAplicaDescME:elem.montoAplicaDescME,
            TipoCliProvId:elem.TipoCliProvId,
            codDirFiscal:elem.codDirFiscal,
            codDirGuia:elem.codDirGuia,
            dirFiscal:elem.dirFiscal,
            dirGuia:elem.dirGuia,
            telefonos:elem.telefonos,
            email:elem.email,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDClienteProveedor = async (data)=>{
    try {
        let distritosEncontrado = null;
        let distritosEncontradosConvertidos = null;
        let distritosEncontradosConvertidos2 = null;
        let codDistritoEncontrado = 0;
        await Promise.all(
            data.map(async(element)=>{
                codDistritoEncontrado = 0;
                await ClienteProveedor.create(element);
                if (element.codDirFiscal === element.codDirGuia){
                    if (element.codDirFiscal !== "")
                    {
                        distritosEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirFiscal}}});
                        if (distritosEncontrado){
                            distritosEncontradosConvertidos = JSON.stringify(distritosEncontrado);
                            distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                            codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                        }
                        await DirCliProv.create({
                            direccion:element.dirFiscal,
                            telefonos:element.telefonos,
                            email:element.email,
                            principal:true,
                            fiscal:true,
                            ClienteProveedorId:element.id,
                            DistritoId:Number(codDistritoEncontrado),
                            idHistorico:0
                            }
                        );
                    }
                }else{
                    if (element.codDirGuia !== ""){
                        distritosEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirFiscal}}});
                        if (distritosEncontrado){
                            distritosEncontradosConvertidos = JSON.stringify(distritosEncontrado);
                            distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                            codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                        }
                        await DirCliProv.create({
                            direccion:element.dirFiscal,
                            telefonos:element.telefonos,
                            email:element.email,
                            principal:true,
                            fiscal:true,
                            ClienteProveedorId:element.id,
                            DistritoId:Number(codDistritoEncontrado),
                            idHistorico:0
                            }
                        );
                        codDistritoEncontrado = 0;
                        distritosEncontrado = await Distrito.findOne({where:{codSunat:{[Op.iLike]:element.codDirGuia}}});
                        if (distritosEncontrado){
                            distritosEncontradosConvertidos = JSON.stringify(distritosEncontrado);
                            distritosEncontradosConvertidos2 = JSON.parse(distritosEncontradosConvertidos);
                            codDistritoEncontrado = distritosEncontradosConvertidos2.id;
                        }
                        await DirCliProv.create({
                            direccion:element.dirGuia,
                            telefonos:element.telefonos,
                            email:element.email,
                            principal:true,
                            fiscal:false,
                            ClienteProveedorId:element.id,
                            DistritoId:Number(codDistritoEncontrado),
                            idHistorico:0
                            }
                        );
                    }
                };
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllClienteProveedor= async ()=>{
    let databaseClienteProveedor = null;
    let apiClienteProveedorRaw = null;
    let apiClienteProveedor = null;
    databaseClienteProveedor = await ClienteProveedor.findAll();
    if (databaseClienteProveedor.length===0){
        apiClienteProveedorRaw = (await axios.get('http://192.168.18.15:82/clientesProveedores')).data;
        apiClienteProveedor = await cleanArray(apiClienteProveedorRaw);
        await cargaBDClienteProveedor(apiClienteProveedor);
        databaseClienteProveedor = await ClienteProveedor.findAll();
    }
    return databaseClienteProveedor;
};

const createClienteProveedor = async (regClienteProveedor)=>{
    const transactionCrearClienteProveedor = await ClienteProveedor.sequelize.transaction();
    try {
        let maxIdClienteProveedor = await ClienteProveedor.max('id', { transaction: transactionCrearClienteProveedor });
        let newClienteProveedor = await ClienteProveedor.create({id:maxIdClienteProveedor+1, ...regClienteProveedor}, { transaction: transactionCrearClienteProveedor });
        await transactionCrearClienteProveedor.commit();
        console.log('registro creado OK Tabla ClienteProveedor');
        return newClienteProveedor;
    } catch (error) {
        await transactionCrearClienteProveedor.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllClienteProveedor,createClienteProveedor};