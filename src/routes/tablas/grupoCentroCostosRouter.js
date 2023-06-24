const {Router} = require("express");
const {getGrupoCentroCostosHandler,createGrupoCentroCostosHandler, deleteGrupoCentroCostosHandler}=require("../../handlers/tablas/grupoCentroCostosHandlers");
const grupoCentroCostosRouter = Router();

grupoCentroCostosRouter.get("/",getGrupoCentroCostosHandler);
grupoCentroCostosRouter.post("/",createGrupoCentroCostosHandler);
grupoCentroCostosRouter.delete("/:id",deleteGrupoCentroCostosHandler);

module.exports = grupoCentroCostosRouter;
