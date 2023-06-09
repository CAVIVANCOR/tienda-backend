const {Router} = require("express");
const {getCentroCostosHandler, createCentroCostosHandler}=require("../../handlers/tablas/centroCostosHandlers");
const centroCostosRouter = Router();

centroCostosRouter.get("/",getCentroCostosHandler);
centroCostosRouter.post("/",createCentroCostosHandler);

module.exports = centroCostosRouter;