const {Router} = require("express");
const {getSubGrupoCentroCostoHandler, createSubGrupoCentroCostoHandler}=require("../../handlers/tablas/subGrupoCentroCostosHandlers");
const subGrupoCentroCostosRouter = Router();

subGrupoCentroCostosRouter.get("/",getSubGrupoCentroCostoHandler);
subGrupoCentroCostosRouter.post("/",createSubGrupoCentroCostoHandler);

module.exports = subGrupoCentroCostosRouter;
