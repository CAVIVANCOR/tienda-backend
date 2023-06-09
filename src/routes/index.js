const {Router} = require("express");
const mainRouter = Router();

const almacenRouter = require("../routes/almacen/almacenRouter");
const cabMovAlmacenRouter = require("../routes/almacen/cabMovAlmacenRouter");
const conceptoAlmacenRouter = require("../routes/almacen/conceptoAlmacenRouter");
const detMovAlmacenRouter = require("../routes/almacen/detMovAlmacenRouter");
const tipoMovAlmacenRouter = require("../routes/almacen/tipoMovAlmacenRouter");
const ubicacionFisicaAlmacenRouter = require("../routes/almacen/ubicacionFisicaAlmacenRouter");
const kardexAlmacenRouter = require("../routes/almacen/kardexAlmacenRouter");

const bancosRouter = require("../routes/clientesProveedores/bancosRouter");
const paisesRouter = require("../routes/clientesProveedores/paisesRouter");
const departamentosRouter = require("../routes/clientesProveedores/departamentosRouter");
const provinciasRouter = require("../routes/clientesProveedores/provinciasRouter");
const distritosRouter = require("../routes/clientesProveedores/distritosRouter");
const tipoDocIdentidadRouter = require("../routes/clientesProveedores/tipoDocIdentidadRouter");
const tiposCliprovRouter = require("../routes/clientesProveedores/tiposCliprovRouter");

const choferesRouter = require("../routes/clientesProveedores/choferesRouter");
const clientesProveedoresRouter = require("../routes/clientesProveedores/clientesProveedoresRouter");
const contactosCliprovRouter = require("../routes/clientesProveedores/contactosCliprovRouter");
const cuentasBancariasCliProvRouter = require("../routes/clientesProveedores/cuentasBancariasCliProvRouter");
const dirCliProvRouter = require("../routes/clientesProveedores/dirCliProvRouter");
const preciosCliProvRouter = require("../routes/clientesProveedores/preciosCliProvRouter");
const transportistasCliProvRouter = require("../routes/clientesProveedores/transportistasCliProvRouter");

const tipoDocumentoRouter = require("../routes/tablas/tipoDocumentoRouter");
const tipoCambioRouter = require("../routes/tablas/tipoCambioRouter");
const correlativoDocRouter = require("../routes/tablas/correlativoDocRouter");
const estadoDocRouter = require("../routes/tablas/estadoDocRouter");
const centroCostosRouter = require("../routes/tablas/centroCostosRouter");
const grupoCentroCostosRouter = require("../routes/tablas/grupoCentroCostosRouter");
const subGrupoCentroCostosRouter = require("../routes/tablas/subGrupoCentroCostosRouter");
const datosGlobalesRouter = require("../routes/tablas/datosGlobalesRouter");

const personalRouter = require("../routes/usuarios/personalRouter");
const accesosRouter = require("../routes/usuarios/accesosRouter");
const modulosRouter = require("../routes/usuarios/modulosRouter");
const rolesRouter = require("../routes/usuarios/rolesRouter");
const subModulosRouter = require("../routes/usuarios/subModulosRouter");
const usuariosRouter = require("../routes/usuarios/usuariosRouter");

const anoProductosRouter = require("../routes/productos/anoProductosRouter");
const colorProductosRouter = require("../routes/productos/colorProductosRouter");
const estadoProductosRouter = require("../routes/productos/estadoproductosRouter");
const familiaProductosRouter = require("../routes/productos/familiaProductosRouter");
const ladoProductosRouter = require("../routes/productos/ladoProductosRouter");
const marcaProductosRouter = require("../routes/productos/marcaProductosRouter");
const materialProductosRouter = require("../routes/productos/materialProductosRouter");
const modeloMarcaProductosRouter = require("../routes/productos/modeloMarcaProductosRouter");
const procedenciaProductosRouter = require("../routes/productos/procedenciaProductosRouter");
const productosRouter = require("../routes/productos/productosRouter");
const subFamiliaProductosRouter = require("../routes/productos/subFamiliaProductosRouter");
const tipoExistenciaContRouter = require("../routes/productos/tipoExistenciaContRouter");
const umProductosRouter = require("../routes/productos/umProductosRouter");

const conceptoMovCRouter = require("../routes/cajaybancos/conceptoMovCRouter");
const cuentasRouter = require("../routes/cajaybancos/cuentasRouter");
const detMovCuentasRouter = require("../routes/cajaybancos/detMovCuentasRouter");
const kardexCuentasRouter = require("../routes/cajaybancos/kardexCuentasRouter");

const cabComprasRouter = require("../routes/compras/cabComprasRouter");
const detComprasRouter = require("../routes/compras/detComprasRouter");
const formaPagoRouter = require("../routes/compras/formaPagoRouter");

const cabVentasRouter = require("../routes/ventas/cabVentasRouter");
const detVentasRouter = require("../routes/ventas/detVentasRouter");

mainRouter.use("/conceptosMovsCuentas", conceptoMovCRouter);
mainRouter.use("/cuentas", cuentasRouter);
mainRouter.use("/detMovCuentas", detMovCuentasRouter);
mainRouter.use("/kardexCuentas", kardexCuentasRouter);

mainRouter.use("/cabCompras", cabComprasRouter);
mainRouter.use("/detCompras", detComprasRouter);
mainRouter.use("/formasPago", formaPagoRouter);
mainRouter.use("/cabVentas", cabVentasRouter);
mainRouter.use("/detVentas", detVentasRouter);


mainRouter.use("/anosProductos", anoProductosRouter);
mainRouter.use("/colorProductos", colorProductosRouter);
mainRouter.use("/estadosProductos", estadoProductosRouter);
mainRouter.use("/familiasProductos", familiaProductosRouter);
mainRouter.use("/ladosProductos", ladoProductosRouter);
mainRouter.use("/marcasProductos", marcaProductosRouter);
mainRouter.use("/materialesProductos", materialProductosRouter);
mainRouter.use("/modelosMarcasProductos", modeloMarcaProductosRouter);
mainRouter.use("/procedenciasProductos", procedenciaProductosRouter);
mainRouter.use("/productos", productosRouter);
mainRouter.use("/subFamiliasProductos", subFamiliaProductosRouter);
mainRouter.use("/tiposExistenciasContProductos", tipoExistenciaContRouter);
mainRouter.use("/umProductos", umProductosRouter);

mainRouter.use("/personal", personalRouter);
mainRouter.use("/tipoDocIdentidad", tipoDocIdentidadRouter);
mainRouter.use("/bancos", bancosRouter);
mainRouter.use("/paises", paisesRouter);
mainRouter.use("/departamentos", departamentosRouter);
mainRouter.use("/provincias", provinciasRouter);
mainRouter.use("/distritos", distritosRouter);
mainRouter.use("/tiposCliProv", tiposCliprovRouter);

mainRouter.use("/choferesTransportistas", choferesRouter);
mainRouter.use("/clientesProveedores", clientesProveedoresRouter);
mainRouter.use("/contactosCliProv", contactosCliprovRouter);
mainRouter.use("/cuentasBancariasCliProv", cuentasBancariasCliProvRouter);
mainRouter.use("/direccionesCliProv", dirCliProvRouter);
mainRouter.use("/preciosCliProv", preciosCliProvRouter);
mainRouter.use("/transportistasCliProv", transportistasCliProvRouter);


mainRouter.use("/tiposDocumento",tipoDocumentoRouter);
mainRouter.use("/tiposCambio", tipoCambioRouter);
mainRouter.use("/correlativosDoc", correlativoDocRouter);
mainRouter.use("/estadosDoc", estadoDocRouter);
mainRouter.use("/centroCostos", centroCostosRouter);
mainRouter.use("/grupoCentroCostos", grupoCentroCostosRouter);
mainRouter.use("/subGrupoCentroCostos", subGrupoCentroCostosRouter);

mainRouter.use("/accesos", accesosRouter);
mainRouter.use("/modulos", modulosRouter);
mainRouter.use("/roles", rolesRouter);
mainRouter.use("/submodulos", subModulosRouter);
mainRouter.use("/usuarios", usuariosRouter);
mainRouter.use("/datosGlobales", datosGlobalesRouter);

mainRouter.use("/almacenes", almacenRouter);
mainRouter.use("/cabMovAlmacen", cabMovAlmacenRouter);
mainRouter.use("/conceptosAlmacen", conceptoAlmacenRouter);
mainRouter.use("/detMovAlmacen", detMovAlmacenRouter);
mainRouter.use("/tiposMovAlmacen", tipoMovAlmacenRouter);
mainRouter.use("/ubicacionesFisicasAlmacen", ubicacionFisicaAlmacenRouter);
mainRouter.use("/kardexAlmacen",kardexAlmacenRouter);


module.exports = mainRouter;