const {Router} = require("express");
const personalRouter = require("./personalRouter");
const tdiRouter = require("./tipoDocIdentidadRouter");
const bancosRouter = require("./bancosRouter");
const PaisesRouter = require("./paisesRouter");
const DepartamentosRouter = require("./departamentosRouter");
const ProvinciasRouter = require("./provinciasRouter");
const distritosRouter = require("./distritosRouter");

const mainRouter = Router();

mainRouter.use("/personal", personalRouter);
mainRouter.use("/tipoDocIdentidad", tdiRouter);
mainRouter.use("/bancos", bancosRouter);
mainRouter.use("/paises", PaisesRouter);
mainRouter.use("/departamentos", DepartamentosRouter);
mainRouter.use("/provincias", ProvinciasRouter);
mainRouter.use("/distritos", distritosRouter);

module.exports = mainRouter;