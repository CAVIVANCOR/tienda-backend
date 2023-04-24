const {Router} = require("express");
const {getGrupoCentroCostosHandler}=require("../../handlers/tablas/grupoCentroCostosHandlers");
const grupoCentroCostosRouter = Router();

grupoCentroCostosRouter.get("/",getGrupoCentroCostosHandler);

module.exports = grupoCentroCostosRouter;
