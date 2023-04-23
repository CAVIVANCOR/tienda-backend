const {Router} = require("express");
const {getCentroCostosHandler}=require("../handlers/centroCostosHandlers");
const centroCostosRouter = Router();

centroCostosRouter.get("/",getCentroCostosHandler);

module.exports = centroCostosRouter;