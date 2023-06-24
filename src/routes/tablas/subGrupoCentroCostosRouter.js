const {Router} = require("express");
const {getSubGrupoCentroCostoHandler, createSubGrupoCentroCostoHandler, deleteSubGrupoCentroCostoHandler, updateSubGrupoCentroCostoHandler}=require("../../handlers/tablas/subGrupoCentroCostosHandlers");
const subGrupoCentroCostosRouter = Router();

subGrupoCentroCostosRouter.get("/",getSubGrupoCentroCostoHandler);
subGrupoCentroCostosRouter.post("/",createSubGrupoCentroCostoHandler);
subGrupoCentroCostosRouter.delete("/:id",deleteSubGrupoCentroCostoHandler);
subGrupoCentroCostosRouter.put("/:id",updateSubGrupoCentroCostoHandler);

module.exports = subGrupoCentroCostosRouter;
