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

module.exports = mainRouter;