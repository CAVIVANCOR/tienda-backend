const {Producto, SubFamilia,Familia, Ano, Colore, Lado, Materiale, Procedencia, TipoExisCont, UMProd, ModeloMarca,DetCompras,DetVentas,DetMovAlmacen} = require("../../db");
const axios = require("axios");
const regProductoUsuario ={
    where: { borradoLogico: false },
    include:[{
                model:SubFamilia,
                attributes:["descripcion"],
                include:[{
                            model:Familia,
                            attributes:["descripcion"],
                        }],
            },{
                model:Ano,
                attributes:["descripcion"],
            },{
                model:Materiale,
                attributes:["descripcion"],
            },{
                model:Colore,
                attributes:["descripcion"],
            },{
                model:Lado,
                attributes:["descripcion"],
            },{
                model:Procedencia,
                attributes:["descripcion"],
            },{
                model:TipoExisCont,
                attributes:["descripcion","codSunat"],
            },{
                model:UMProd,
                attributes:["descripcion","conversion","abreviacion"],
            },{
                model:ModeloMarca,
                attributes:["descripcion"],
            }]
};
const {where,...regProductoAdmin}=regProductoUsuario;

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
        console.log(error.message);
        throw new Error(error.message);
    }
};

const getAllProducto= async (isAdministrator=false)=>{
    let databaseProducto = null;
    let apiProductoRaw = null;
    let apiProducto = null;
    let regProducto = regProductoUsuario;
    if (isAdministrator) regProducto = regProductoAdmin;
    databaseProducto = await Producto.findAll(regProducto);
    if (databaseProducto.length===0){
        apiProductoRaw = (await axios.get('http://192.168.18.15:82/productos')).data;
        apiProducto = await cleanArray(apiProductoRaw);
        await cargaBDProducto(apiProducto);
        databaseProducto = await Producto.findAll(regProducto);
    }
    return databaseProducto;
};

const createProducto = async (regProducto)=>{
    const transactionCrearProducto = await Producto.sequelize.transaction();
    try {
        let maxIdProducto = await Producto.max('id');
        let newProducto = await Producto.create({id:maxIdProducto+1, ...regProducto},{transaction:transactionCrearProducto});
        await transactionCrearProducto.commit();
        console.log('Registro Creado OK Tabla Producto');
        return newProducto;
    } catch (error) {
        await transactionCrearProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const deleteProducto = async (id)=>{
    const transactionEliminarProducto = await Producto.sequelize.transaction();
    try {
        let foundProducto = await Producto.findByPk(id);
        if (!foundProducto) throw new Error('ID de Producto no encontrado');
        let foundDetCompras = await DetCompras.findAll({where:{ProductoId: id, borradoLogico: false}});
        let foundDetVentas = await DetVentas.findAll({where:{ProductoId: id, borradoLogico: false}});
        let foundDetMovAlmacen = await DetMovAlmacen.findAll({where:{ProductoId: id, borradoLogico: false}});
        if (foundDetCompras.length>0) throw new Error('Existen compras asociadas a este producto');
        if (foundDetVentas.length>0) throw new Error('Existen ventas asociadas a este producto');
        if (foundDetMovAlmacen.length>0) throw new Error('Existen movimientos de almacen asociados a este producto');
        let deletedProducto = await foundProducto.update({borradoLogico:!foundProducto.borradoLogico},{transaction:transactionEliminarProducto});
        await transactionEliminarProducto.commit();
        console.log('Registro Eliminado OK Tabla Producto');
        return deletedProducto;
    } catch (error) {
        await transactionEliminarProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const updateProducto = async (id,regProducto)=>{
    const transactionActualizarProducto = await Producto.sequelize.transaction();
    try {
        let foundProducto = await Producto.findByPk(id);
        if (!foundProducto) throw new Error('ID de Producto no encontrado');
        let updatedProducto = await foundProducto.update(regProducto,{transaction:transactionActualizarProducto});
        await transactionActualizarProducto.commit();
        console.log('Registro Actualizado OK Tabla Producto');
        return updatedProducto;
    } catch (error) {
        await transactionActualizarProducto.rollback();
        console.log(error.message);
        throw new Error(error.message);
    };
};

const searchProductos = async (search)=>{
    try {
        let buscar = {};
        for (let [key, value] of Object.entries(search)) {
            if (typeof value === 'string') {
                buscar[key] = { [Op.like]: `%${value}%` };
            } else {
                buscar[key] = value;
            };
        };
        let foundProducto = await Producto.findAll({
            where: {
                [Op.and]: buscar
            },
            include: [{
                model:SubFamilia,
                required:true,
            },{
                model: Ano,
                required:true,
            },{
                model:Materiale,
                required:true,
            },{
                model:Colore,
                required:true,
            },{
                model:Lado,
                required:true,
            },{
                model:Procedencia,
                required:true,
            },{
                model:TipoExisCont,
                required:true,
            },{
                model:UMProd,
                required:true,
            },{
                model:ModeloMarca,
                required:true,
            }]
        });
        console.log("searchProductos:Registros encontrados en Tabla Producto",foundProducto, foundProducto.length);
        return foundProducto;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    };
};

module.exports = {getAllProducto, createProducto, deleteProducto, updateProducto, searchProductos};