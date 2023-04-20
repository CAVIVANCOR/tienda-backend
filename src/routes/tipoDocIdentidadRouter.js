const {Router}=require("express");
const {getTDIHandler} = require("../handlers/tipoDocIdentidadHandlers");
const TDIRouter = Router();

TDIRouter.get("/",getTDIHandler);

module.exports = TDIRouter;