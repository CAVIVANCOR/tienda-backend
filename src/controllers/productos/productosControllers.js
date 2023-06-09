const {Producto, SubFamilia,Familia, Ano, Colore, Lado, Materiale, Procedencia, TipoExisCont, UMProd, ModeloMarca, Marca} = require("../../db");
const axios = require("axios");

const cleanArray=(arr)=>{
    const clean = arr.map((elem)=>{
        return {
            id:elem.id,
            descripcion:elem.descripcion,
            codigoProveedor:elem.codigoProveedor,
            codigoFabricante:elem.codigoFabricante,
            modeloFabricante:elem.modeloFabricante,
            stockMinimo:elem.stockMinimo,
            stockMaximo:elem.stockMaximo,
            urlFotoProducto:elem.urlFotoProducto,
            urlWebProductoFabricante:elem.urlWebProductoFabricante,
            valorVentaUnitMN:elem.valorVentaUnitMN,
            valorVentaUnitME:elem.valorVentaUnitME,
            porcentajeMaxDescConAutorizacion:elem.porcentajeMaxDescConAutorizacion,
            porcentajeMaxDescSinAutorizacion:elem.porcentajeMaxDescSinAutorizacion,
            porcentajeMaxDescPorCantidad:elem.porcentajeMaxDescPorCantidad,
            cantidadAplicaDesc:elem.cantidadAplicaDesc,
            moneda:elem.moneda,
            noKardex:elem.noKardex,
            listaPrecios:elem.listaPrecios,
            costoUnitarioMN:elem.costoUnitarioMN,
            nroMesesGarantia:elem.nroMesesGarantia,
            costoUnitarioME:elem.costoUnitarioME,
            SubFamiliumId:elem.SubFamiliaProductoId,
            AnoId:elem.AnoProductoId,
            ColoreId:elem.ColorProductoId,
            LadoId:elem.LadoProductoId,
            MaterialeId:elem.MaterialProductoId,
            ProcedenciumId:elem.ProcedenciaProductoId,
            TipoExisContId:elem.TipoExistenciaContId,
            UMProdId:elem.UMProductoId,
            ModeloMarcaId:elem.ModeloMarcaId,
            idHistorico:elem.id,
        };
    });
    return clean;
};

const cargaBDProducto = async (data)=>{
    try {
        await Promise.all(
            data.map(async(element)=>{
                await Producto.create(element);
            })
        )
        return 
    } catch (error) {
        console.log(error.message)
    }
};

const getAllProducto= async ()=>{
    let databaseProducto = null;
    let apiProductoRaw = null;
    let apiProducto = null;
    databaseProducto = await Producto.findAll({
        include:[{
                    model:SubFamilia,
                    attributes:["descripcion"],
                        include:[{
                                    model:Familia,
                                    attributes:["descripcion"],
                                }],
                },
                {
                    model:Ano,
                    attributes:["descripcion"],
                },
                {
                    model:Materiale,
                    attributes:["descripcion"],
                },
                {
                    model:Colore,
                    attributes:["descripcion"],
                },
                {
                    model:Lado,
                    attributes:["descripcion"],
                },
                {
                    model:Procedencia,
                    attributes:["descripcion"],
                },
                {
                    model:TipoExisCont,
                    attributes:["descripcion","codSunat"],
                },
                {
                    model:UMProd,
                    attributes:["descripcion","conversion","abreviacion"],
                },
                {
                    model:ModeloMarca,
                    attributes:["descripcion"],
                }
            ]
    });
    if (databaseProducto.length===0){
        apiProductoRaw = (await axios.get('http://192.168.18.15:82/productos')).data;
        apiProducto = await cleanArray(apiProductoRaw);
        await cargaBDProducto(apiProducto);
        databaseProducto = await Producto.findAll({
            include:[{
                        model:SubFamilia,
                        attributes:["descripcion"],
                            include:[{
                                        model:Familia,
                                        attributes:["descripcion"],
                                    }],
                    },
                    {
                        model:Ano,
                        attributes:["descripcion"],
                    },
                    {
                        model:Materiale,
                        attributes:["descripcion"],
                    },
                    {
                        model:Colore,
                        attributes:["descripcion"],
                    },
                    {
                        model:Lado,
                        attributes:["descripcion"],
                    },
                    {
                        model:Procedencia,
                        attributes:["descripcion"],
                    },
                    {
                        model:TipoExisCont,
                        attributes:["descripcion","codSunat"],
                    },
                    {
                        model:UMProd,
                        attributes:["descripcion","conversion","abreviacion"],
                    },
                    {
                        model:ModeloMarca,
                        attributes:["descripcion"],
                    }
                ]
        });
    }
    return databaseProducto;
};

const createProducto = async (regProducto)=>{
    const transactionCrearProducto = await Producto.sequelize.transaction();
    try {
        let maxIdProducto = await Producto.max('id',{transaction:transactionCrearProducto});
        let newProducto = await Producto.create({id:maxIdProducto+1, ...regProducto},{transaction:transactionCrearProducto});
        await transactionCrearProducto.commit();
        console.log('Registro Creado OK Tabla Producto');
        return newProducto;
    } catch (error) {
        await transactionCrearProducto.rollback();
        console.log(error.message);
    };
};

module.exports = {getAllProducto, createProducto};