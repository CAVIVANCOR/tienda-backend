const {Router} = require("express");
const mainRouter = Router();

const bancosRouter = require("../routes/clientesProveedores/bancosRouter");
const paisesRouter = require("../routes/clientesProveedores/paisesRouter");
const departamentosRouter = require("../routes/clientesProveedores/departamentosRouter");
const provinciasRouter = require("../routes/clientesProveedores/provinciasRouter");
const distritosRouter = require("../routes/clientesProveedores/distritosRouter");
const tipoDocIdentidadRouter = require("../routes/clientesProveedores/tipoDocIdentidadRouter");

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



mainRouter.use("/personal", personalRouter);
mainRouter.use("/tipoDocIdentidad", tipoDocIdentidadRouter);
mainRouter.use("/bancos", bancosRouter);
mainRouter.use("/paises", paisesRouter);
mainRouter.use("/departamentos", departamentosRouter);
mainRouter.use("/provincias", provinciasRouter);
mainRouter.use("/distritos", distritosRouter);

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


module.exports = mainRouter;