const {Router} = require("express");
const {getSubGrupoCentroCostoHandler}=require("../../handlers/tablas/subGrupoCentroCostosHandlers");
const subGrupoCentroCostosRouter = Router();

subGrupoCentroCostosRouter.get("/",getSubGrupoCentroCostoHandler);

module.exports = subGrupoCentroCostosRouter;
