const {Router} = require("express");
const {getGrupoCentroCostosHandler,createGrupoCentroCostosHandler, deleteGrupoCentroCostosHandler, updateGrupoCentroCostosHandler}=require("../../handlers/tablas/grupoCentroCostosHandlers");
const grupoCentroCostosRouter = Router();

grupoCentroCostosRouter.get("/",getGrupoCentroCostosHandler);
grupoCentroCostosRouter.post("/",createGrupoCentroCostosHandler);
grupoCentroCostosRouter.delete("/:id",deleteGrupoCentroCostosHandler);
grupoCentroCostosRouter.put("/:id",updateGrupoCentroCostosHandler);

module.exports = grupoCentroCostosRouter;
