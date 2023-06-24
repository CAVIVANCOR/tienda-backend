const {Router} = require("express");
const {getCentroCostosHandler, createCentroCostosHandler, deleteCentroCostoHandler}=require("../../handlers/tablas/centroCostosHandlers");
const centroCostosRouter = Router();

centroCostosRouter.get("/",getCentroCostosHandler);
centroCostosRouter.post("/",createCentroCostosHandler);
centroCostosRouter.delete("/:id",deleteCentroCostoHandler);

module.exports = centroCostosRouter;