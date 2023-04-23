const {Router} = require("express");
const {getGrupoCentroCostosHandler}=require("../handlers/grupoCentroCostosHandlers");
const grupoCentroCostosRouter = Router();

grupoCentroCostosRouter.get("/",getGrupoCentroCostosHandler);

module.exports = grupoCentroCostosRouter;
