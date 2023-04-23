const {Router}=require("express");
const {getTDIHandler} = require("../handlers/tipoDocIdentidadHandlers");
const tipoDocIdentidadRouter = Router();

tipoDocIdentidadRouter.get("/",getTDIHandler);

module.exports = tipoDocIdentidadRouter;