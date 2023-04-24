const {Router} = require("express");
const {getCentroCostosHandler}=require("../../handlers/tablas/centroCostosHandlers");
const centroCostosRouter = Router();

centroCostosRouter.get("/",getCentroCostosHandler);

module.exports = centroCostosRouter;