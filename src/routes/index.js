const {Router} = require("express");
const mainRouter = Router();

const personalRouter = require("./personalRouter");
const tipoDocIdentidadRouter = require("./tipoDocIdentidadRouter");
const bancosRouter = require("./bancosRouter");
const paisesRouter = require("./paisesRouter");
const departamentosRouter = require("./departamentosRouter");
const provinciasRouter = require("./provinciasRouter");
const distritosRouter = require("./distritosRouter");

const tipoDocumentoRouter = require("./tipoDocumentoRouter");
const tipoCambioRouter = require("./tipoCambioRouter");
const correlativoDocRouter = require("./correlativoDocRouter");
const estadoDocRouter = require("./estadoDocRouter");
const centroCostosRouter = require("./centroCostosRouter");
const grupoCentroCostosRouter = require("./grupoCentroCostosRouter");
const subGrupoCentroCostosRouter = require("./subGrupoCentroCostosRouter");

const accesosRouter = require("./accesosRouter");
const modulosRouter = require("./modulosRouter");
const rolesRouter = require("./rolesRouter");
const subModulosRouter = require("./subModulosRouter");
const usuariosRouter = require("./usuariosRouter");
const datosGlobalesRouter = require("./datosGlobalesRouter");



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