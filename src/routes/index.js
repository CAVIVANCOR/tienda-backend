const {Router} = require("express");
const personalRouter = require("./personalRouter");
const TDIRouter = require("./tipoDocIdentidadRouter");

const mainRouter = Router();

mainRouter.use("/personal", personalRouter);
mainRouter.use("/tipoDocIdentidad", TDIRouter);

module.exports = mainRouter;