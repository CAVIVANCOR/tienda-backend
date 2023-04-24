const {Router}=require("express");
const {getTDIHandler} = require("../../handlers/clientesProveedores/tipoDocIdentidadHandlers");
const tipoDocIdentidadRouter = Router();

tipoDocIdentidadRouter.get("/",getTDIHandler);

module.exports = tipoDocIdentidadRouter;