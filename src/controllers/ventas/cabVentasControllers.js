const {CabVentas, MotivoNCND, TipoDocIdentidad, DetVentas,CorrelativoDoc,Producto,FormaPago,CentroCosto, ClienteProveedor, EstadoDoc, TipoDocumento, TipoCambio, Usuario, Personal} = require("../../db");
const axios = require("axios");
const { deleteDetVentas } = require("./detVentasControllers");
const { Op } = require("sequelize");
const regCabVentasUsuario ={
    where: { borradoLogico: false },
    include:[{
                model:DetVentas,
                include:[{
                    model:Producto,
                }]
            },{
                model:FormaPago,
                attributes:["descripcion","nDias","contado","tipo"]
            },{
                model:CentroCosto,
                attributes:["descripcion","tipoIngEgr","calcUtilidades"]
            },{
                model:ClienteProveedor,
                attributes:["razonSocial","nombreComercial","numDocIdentidad","telefonos","email","emailFactSunat","monedaLineaCredito","lineaCreditoMN","lineaCreditoME","saldoAnticiposMN","saldoAnticiposME","monedaMontoAplicaDesc","porcentajeDesc","montoAplicaDescMN","montoAplicaDescME"]
            },{
                model:EstadoDoc,
                attributes:["descripcion"]
            },{
                model:CorrelativoDoc,
                attributes:["serie","correlativo","nroCeros"],
                include:[{
                    model:TipoDocumento,
                    attributes:["descripcion","iniciales","codSunat"]
                }]
            },{
                model:TipoCambio,
                attributes:["fecha","compra","venta"]
            },{
                model:Usuario,
                attributes:["usuario"],
                include:[{
                    model:Personal,
                    attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor"]
                }]
            }]
};
const {where,...regCabVentasAdmin}=regCabVentasUsuario;
const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            fecha:elem.fecha,
            serieDcmto:elem.serieDcmto,
            correlativoDcmto:elem.correlativoDcmto,
            observaciones:elem.observaciones,
            idVendedor:elem.idVendedor,
            idTecnico:elem.idTecnico,
            numPlacas:elem.numPlacas,
            tipoCambio:elem.tipoCambio,
            porcentajeIGV:elem.porcentajeIGV,
            exonerado:elem.exonerado,
            moneda:elem.moneda,
            factElectOK:elem.factElectOK,
            ClienteProveedorId:elem.ClienteProveedorId,
            FormaPagoId:elem.FormaPagoId,
            EstadoDocId:elem.EstadoDocId,
            UsuarioId:elem.UsuarioId,
            TipoCambioId:elem.TipoCambioId,
            CentroCostoId:elem.CentroCostoId,
            CorrelativoDocId:elem.CorrelativoDocId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDCabVentas = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await CabVentas.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllCabVentas= async (isAdministrator=false)=>{
    let databaseCabVentas = null;
    let apiCabVentasRaw = null;
    let apiCabVentas = null;
    let regCabVentas = regCabVentasUsuario;
    if (isAdministrator) regCabVentas = regCabVentasAdmin;
    databaseCabVentas = await CabVentas.findAll(regCabVentas);
    console.log("getAllCabVentas:Registros encontrados en Tabla CabVentas", databaseCabVentas.length);
    if (databaseCabVentas.length===0){
        apiCabVentasRaw = (await axios.get('http://192.168.18.15:82/cabVentas')).data;
        apiCabVentas = await cleanArray(apiCabVentasRaw);
        await cargaBDCabVentas(apiCabVentas);
        databaseCabVentas = await CabVentas.findAll(regCabVentas);
    }
    return databaseCabVentas;
};

// const envioSunatCabVentas = async (regCabVentas)=>{
//     const transactionEnvioSunatCabVentas = await CabVentas.sequelize.transaction();
//     const data = {
//         "personaId": "651c6cbee205ab00142d02c0",
//         "personaToken": "DEV_1VJi15nAWxMLYR95tPCgSyVlyHLYQdy2CzZ5ZPzpaAsC4KHWFX2IJTclQivFdLLi",
//         "fileName": "10100082697-03-B001-00000001",
//         "documentBody": {
//             "cbc:UBLVersionID": {
//                 "_text": "2.1"
//             },
//             "cbc:CustomizationID": {
//                 "_text": "2.0"
//             },
//             "cbc:ID": {
//                 "_text": "B001-00000001"
//             },
//             "cbc:IssueDate": {
//                 "_text": "2023-10-04"
//             },
//             "cbc:IssueTime": {
//                 "_text": "13:02:12"
//             },
//             "cbc:InvoiceTypeCode": {
//                 "_attributes": {
//                     "listID": "0101"
//                 },
//                 "_text": "03"
//             },
//             "cbc:Note": [
//                 {
//                     "_text": "CIENTO CINCUENTA Y TRES CON 10/100 SOLES",
//                     "_attributes": {
//                         "languageLocaleID": "1000"
//                     }
//                 }
//             ],

//             "cbc:DocumentCurrencyCode": {
//                 "_text": "PEN"
//             },

//             // datos proveedor
//             "cac:AccountingSupplierParty": {
//                 "cac:Party": {
//                     "cac:PartyIdentification": {
//                         "cbc:ID": {
//                             "_attributes": {
//                                 "schemeID": "6"
//                             },
//                             "_text": "10100082697"
//                         }
//                     },
//                     "cac:PartyName": {
//                         "cbc:Name": {
//                             "_text": "13 EL FUTURO HOY"
//                         }
//                     },
//                     "cac:PartyLegalEntity": {
//                         "cbc:RegistrationName": {
//                             "_text": "VIVANCO RODRIGUEZ CARLOS ALBERTO"
//                         },
//                         "cac:RegistrationAddress": {
//                             "cbc:AddressTypeCode": {
//                                 "_text": "0000"
//                             },
//                             "cac:AddressLine": {
//                                 "cbc:Line": {
//                                     "_text": "AV. PEDRO SILVA NRO. 1030 ZONA C SAN JUAN DE MIRAFLORES LIMA LIMA"
//                                 }
//                             }
//                         }
//                     }
//                 }
//             },

//             // datos cliente
//             "cac:AccountingCustomerParty": {
//                 "cac:Party": {
//                     "cac:PartyIdentification": {
//                         "cbc:ID": {
//                             "_attributes": {
//                                 "schemeID": "6"
//                             },
//                             "_text": "10100082697"
//                         }
//                     },
//                     "cac:PartyLegalEntity": {
//                         "cbc:RegistrationName": {
//                             "_text": "VIVANCO RODRIGUEZ CARLOS ALBERTO"
//                         },
//                         "cac:RegistrationAddress": {
//                             "cac:AddressLine": {
//                                 "cbc:Line": {
//                                     "_text": "AV. PEDRO SILVA NRO. 1030 ZONA C SAN JUAN DE MIRAFLORES LIMA LIMA"
//                                 }
//                             }
//                         }
//                     }
//                 }
//             },

//             // impuestos totales
//             "cac:TaxTotal": {
//                 "cbc:TaxAmount": {
//                     "_attributes": {
//                         "currencyID": "PEN"
//                     },
//                     "_text": 23.35
//                 },
//                 "cac:TaxSubtotal": [
//                     {
//                         "cbc:TaxableAmount": {
//                             "_attributes": {
//                                 "currencyID": "PEN"
//                             },
//                             "_text": 129.75
//                         },
//                         "cbc:TaxAmount": {
//                             "_attributes": {
//                                 "currencyID": "PEN"
//                             },
//                             "_text": 23.35
//                         },
//                         "cac:TaxCategory": {
//                             "cac:TaxScheme": {
//                                 "cbc:ID": {
//                                     "_text": "1000"
//                                 },
//                                 "cbc:Name": {
//                                     "_text": "IGV"
//                                 },
//                                 "cbc:TaxTypeCode": {
//                                     "_text": "VAT"
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             },

//             // totales TODO
//             "cac:LegalMonetaryTotal": {
//                 "cbc:LineExtensionAmount": {
//                     "_attributes": {
//                         "currencyID": "PEN"
//                     },
//                     "_text": 129.75
//                 },
//                 "cbc:TaxInclusiveAmount": {
//                     "_attributes": {
//                         "currencyID": "PEN"
//                     },
//                     "_text": 153.1
//                 },
//                 "cbc:PayableAmount": {
//                     "_attributes": {
//                         "currencyID": "PEN"
//                     },
//                     "_text": 153.1
//                 }
//             },

//             // productos o items
//             "cac:InvoiceLine": [
//                 {
//                     "cbc:ID": {
//                         "_text": 1
//                     },
//                     "cbc:InvoicedQuantity": {
//                         "_attributes": {
//                             "unitCode": "NIU"
//                         },
//                         "_text": 1
//                     },
//                     "cbc:LineExtensionAmount": {
//                         "_attributes": {
//                             "currencyID": "PEN"
//                         },
//                         "_text": 84.75
//                     },
//                     "cac:PricingReference": {
//                         "cac:AlternativeConditionPrice": {
//                             "cbc:PriceAmount": {
//                                 "_attributes": {
//                                     "currencyID": "PEN"
//                                 },
//                                 "_text": 100
//                             },
//                             "cbc:PriceTypeCode": {
//                                 "_text": "01"
//                             }
//                         }
//                     },
//                     "cac:TaxTotal": {
//                         "cbc:TaxAmount": {
//                             "_attributes": {
//                                 "currencyID": "PEN"
//                             },
//                             "_text": 15.25
//                         },
//                         "cac:TaxSubtotal": [
//                             {
//                                 "cbc:TaxableAmount": {
//                                     "_attributes": {
//                                         "currencyID": "PEN"
//                                     },
//                                     "_text": 84.75
//                                 },
//                                 "cbc:TaxAmount": {
//                                     "_attributes": {
//                                         "currencyID": "PEN"
//                                     },
//                                     "_text": 15.25
//                                 },
//                                 "cac:TaxCategory": {
//                                     "cbc:Percent": {
//                                         "_text": 18
//                                     },
//                                     "cbc:TaxExemptionReasonCode": {
//                                         "_text": "10"
//                                     },
//                                     "cac:TaxScheme": {
//                                         "cbc:ID": {
//                                             "_text": "1000"
//                                         },
//                                         "cbc:Name": {
//                                             "_text": "IGV"
//                                         },
//                                         "cbc:TaxTypeCode": {
//                                             "_text": "VAT"
//                                         }
//                                     }
//                                 }
//                             }
//                         ]
//                     },
//                     "cac:Item": {
//                         "cbc:Description": {
//                             "_text": "pantalon jean"
//                         },
//                         "cac:SellersItemIdentification": {
//                             "cbc:ID": {
//                                 "_text": "4588"
//                             }
//                         }
//                     },
//                     "cac:Price": {
//                         "cbc:PriceAmount": {
//                             "_attributes": {
//                                 "currencyID": "PEN"
//                             },
//                             "_text": 84.7457627119
//                         }
//                     }
//                 },
//                 {
//                     "cbc:ID": {
//                         "_text": 2
//                     },
//                     "cbc:InvoicedQuantity": {
//                         "_attributes": {
//                             "unitCode": "NIU"
//                         },
//                         "_text": 1
//                     },
//                     "cbc:LineExtensionAmount": {
//                         "_attributes": {
//                             "currencyID": "PEN"
//                         },
//                         "_text": 45
//                     },
//                     "cac:PricingReference": {
//                         "cac:AlternativeConditionPrice": {
//                             "cbc:PriceAmount": {
//                                 "_attributes": {
//                                     "currencyID": "PEN"
//                                 },
//                                 "_text": 53.1
//                             },
//                             "cbc:PriceTypeCode": {
//                                 "_text": "01"
//                             }
//                         }
//                     },
//                     "cac:TaxTotal": {
//                         "cbc:TaxAmount": {
//                             "_attributes": {
//                                 "currencyID": "PEN"
//                             },
//                             "_text": 8.1
//                         },
//                         "cac:TaxSubtotal": [
//                             {
//                                 "cbc:TaxableAmount": {
//                                     "_attributes": {
//                                         "currencyID": "PEN"
//                                     },
//                                     "_text": 45
//                                 },
//                                 "cbc:TaxAmount": {
//                                     "_attributes": {
//                                         "currencyID": "PEN"
//                                     },
//                                     "_text": 8.1
//                                 },
//                                 "cac:TaxCategory": {
//                                     "cbc:Percent": {
//                                         "_text": 18
//                                     },
//                                     "cbc:TaxExemptionReasonCode": {
//                                         "_text": "10"
//                                     },
//                                     "cac:TaxScheme": {
//                                         "cbc:ID": {
//                                             "_text": "1000"
//                                         },
//                                         "cbc:Name": {
//                                             "_text": "IGV"
//                                         },
//                                         "cbc:TaxTypeCode": {
//                                             "_text": "VAT"
//                                         }
//                                     }
//                                 }
//                             }
//                         ]
//                     },
//                     "cac:Item": {
//                         "cbc:Description": {
//                             "_text": "camiseta"
//                         },
//                         "cac:SellersItemIdentification": {
//                             "cbc:ID": {
//                                 "_text": "00015"
//                             }
//                         }
//                     },
//                     "cac:Price": {
//                         "cbc:PriceAmount": {
//                             "_attributes": {
//                                 "currencyID": "PEN"
//                             },
//                             "_text": 45
//                         }
//                     }
//                 }
//             ]
//         }
//     }
//     let regCabVentasJSON=JSON.stringify(data)
//     let newCabVentas = JSON.parse(regCabVentasJSON);
//     console.log("newCabVentas", newCabVentas);
//     try {
//         await CabVentas.sequelize.query('Lock Table CabVentas',{transaction:transactionEnvioSunatCabVentas});
//         let apiCabVentas = (await axios.post('https://back.apisunat.com/personas/v1/sendBill',regCabVentasJSON)).data;
//         console.log("envioSunatCabVentas:apiCabVentasRaw", apiCabVentas);
//         await transactionEnvioSunatCabVentas.commit();
//         return newCabVentas;
//     } catch (error) {
//         await transactionEnvioSunatCabVentas.rollback();
//         console.log(error.message);
//         throw new Error(error.message);
//     };
// }

const createCabVentas = async (regCabVentas)=>{
    const transactionCrearCabVentas = await CabVentas.sequelize.transaction();
    try {
        await CabVentas.sequelize.query('Lock Table CabVentas',{transaction:transactionCrearCabVentas});
        let maxIdCabVentas = await CabVentas.max('id');
        let newCabVentas = await CabVentas.create({id:maxIdCabVentas+1, ...regCabVentas}, {transaction:transactionCrearCabVentas});
        await DetVentas.bulkCreate(regCabVentas.DetVentas, {transaction:transactionCrearCabVentas});
        await transactionCrearCabVentas.commit();
        return newCabVentas;
    } catch (error) {
        await transactionCrearCabVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
}

const deleteCabVentas = async (id)=>{
    let transactionEliminarCabVentas = await CabVentas.sequelize.transaction();
    try {
        let foundCabVentas = await CabVentas.findByPk(id);
        if (!foundCabVentas) throw new Error('ID de CabVentas no encontrado');
        let foundDetVentas = await DetVentas.findAll({where:{CabVentaId:id,borradoLogico:false}});
        if (foundDetVentas.length > 0){
            await Promise.all(
                foundDetVentas.map(async (detalle) => {
                    await deleteDetVentas(detalle.id);
                })
            )
        };
        let deletedCabVentas = await foundCabVentas.update({borradoLogico:!foundCabVentas.borradoLogico},{transaction:transactionEliminarCabVentas});
        await transactionEliminarCabVentas.commit();
        console.log('Registro eliminado OK Tabla CabVentas');
        return deletedCabVentas;
    } catch (error) {
        await transactionEliminarCabVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateCabVentas = async (id,regCabVentas)=>{
    let transactionActualizarCabVentas = await CabVentas.sequelize.transaction();
    try {
        let foundCabVentas = await CabVentas.findByPk(id);
        if (!foundCabVentas) throw new Error('ID de CabVentas no encontrado');
        let updatedCabVentas = await foundCabVentas.update(regCabVentas, {transaction:transactionActualizarCabVentas});
        await transactionActualizarCabVentas.commit();
        console.log('Registro actualizado OK Tabla CabVentas');
        return updatedCabVentas;
    } catch (error) {
        await transactionActualizarCabVentas.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchByCabVentas= async (search)=>{
    try {
        let buscar = {};
        buscar.borradoLogico = false;
        if (search.razonSocial !== undefined) {
            buscar['$ClienteProveedor.razonSocial$'] = { [Op.like]: `%${search.razonSocial.toUpperCase()}%` };
            delete search.razonSocial;
        };
        if (search.nombreComercial !== undefined) {
            buscar['$ClienteProveedor.nombreComercial$'] = { [Op.like]: `%${search.nombreComercial.toUpperCase()}%` };
            delete search.nombreComercial;
        };
        if (search.numDocIdentidad !== undefined) {
            buscar['$ClienteProveedor.numDocIdentidad$'] = { [Op.eq]: search.numDocIdentidad };
            delete search.numDocIdentidad;
        };
        if (search.lineaCreditoMN !== undefined) {
            buscar['$ClienteProveedor.lineaCreditoMN$'] = { [Op.gt]: search.lineaCreditoMN };
            delete search.lineaCreditoMN;
        };
        if (search.fecha !== undefined) {
            buscar.fecha = { [Op.eq]: search.fecha };
            delete search.fecha;
        };
        if (search.tipodocdiferente !== undefined) {
            buscar.CorrelativoDocId = { [Op.not]: search.tipodocdiferente };
            delete search.tipodocdiferente;
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
                buscar[key] = { [Op.like]: `%${value.toUpperCase()}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundRegsCabVentas = await CabVentas.findAll({
            where: buscar,
            include: [{
                        model:DetVentas,
                        include:[{
                            model:Producto,
                        }]
                    },{
                        model: ClienteProveedor,
                        required: true,
                        include:[{
                            model:TipoDocIdentidad,
                            required:true,
                            attributes:["iniciales"]
                        }]
                    },{
                        model: CentroCosto,
                        required: true
                    },{
                        model: EstadoDoc,
                        required: true
                    },{
                        model: Usuario,
                        include:[{
                            model:Personal,
                            attributes:["nombres","email","telefonos","urlFoto","nroDocIdentidad","vendedor"],
                            required: true
                        }],
                        required: true
                    },{
                        model: TipoCambio,
                        required: true
                    },{
                        model: CorrelativoDoc,
                        include:[{
                            model: TipoDocumento,
                            required: true
                        }],
                        required: true
                    },{
                        model: FormaPago,
                        required: true
                    },{
                        model: MotivoNCND,
                    }]
        });
        console.log("searchByCabVentas:Registros encontrados en Tabla CabVentas", foundRegsCabVentas.length);
        return foundRegsCabVentas;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
        
    }
};


module.exports = {getAllCabVentas,createCabVentas,deleteCabVentas, updateCabVentas, searchByCabVentas};