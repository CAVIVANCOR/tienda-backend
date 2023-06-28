const {Router} = require("express");
const {getCentroCostosHandler, createCentroCostosHandler, deleteCentroCostoHandler, updateCentroCostoHandler, searchCentroCostoHandler}=require("../../handlers/tablas/centroCostosHandlers");
const centroCostosRouter = Router();

centroCostosRouter.get("/",getCentroCostosHandler);
centroCostosRouter.post("/",createCentroCostosHandler);
centroCostosRouter.delete("/:id",deleteCentroCostoHandler);
centroCostosRouter.put("/:id",updateCentroCostoHandler);
centroCostosRouter.get("/search/",searchCentroCostoHandler);

module.exports = centroCostosRouter;