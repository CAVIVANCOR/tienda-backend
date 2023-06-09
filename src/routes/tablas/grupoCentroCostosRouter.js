const {Router} = require("express");
const {getGrupoCentroCostosHandler,createGrupoCentroCostosHandler}=require("../../handlers/tablas/grupoCentroCostosHandlers");
const grupoCentroCostosRouter = Router();

grupoCentroCostosRouter.get("/",getGrupoCentroCostosHandler);
grupoCentroCostosRouter.post("/",createGrupoCentroCostosHandler);

module.exports = grupoCentroCostosRouter;
