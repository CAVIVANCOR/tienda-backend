const {Router} = require("express");
const {getGrupoCentroCostosHandler,createGrupoCentroCostosHandler, deleteGrupoCentroCostosHandler, updateGrupoCentroCostosHandler, searchGrupoCentroCostosHandler}=require("../../handlers/tablas/grupoCentroCostosHandlers");
const grupoCentroCostosRouter = Router();

grupoCentroCostosRouter.get("/",getGrupoCentroCostosHandler);
grupoCentroCostosRouter.post("/",createGrupoCentroCostosHandler);
grupoCentroCostosRouter.delete("/:id",deleteGrupoCentroCostosHandler);
grupoCentroCostosRouter.put("/:id",updateGrupoCentroCostosHandler);
grupoCentroCostosRouter.get("/search/",searchGrupoCentroCostosHandler);

module.exports = grupoCentroCostosRouter;
