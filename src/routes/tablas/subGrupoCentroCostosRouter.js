const {Router} = require("express");
const {getSubGrupoCentroCostoHandler, createSubGrupoCentroCostoHandler, deleteSubGrupoCentroCostoHandler}=require("../../handlers/tablas/subGrupoCentroCostosHandlers");
const subGrupoCentroCostosRouter = Router();

subGrupoCentroCostosRouter.get("/",getSubGrupoCentroCostoHandler);
subGrupoCentroCostosRouter.post("/",createSubGrupoCentroCostoHandler);
subGrupoCentroCostosRouter.delete("/:id",deleteSubGrupoCentroCostoHandler);

module.exports = subGrupoCentroCostosRouter;
