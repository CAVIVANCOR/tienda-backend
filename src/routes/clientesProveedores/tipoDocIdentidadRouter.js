const {Router}=require("express");
const {getTDIHandler,createTDIHandler} = require("../../handlers/clientesProveedores/tipoDocIdentidadHandlers");
const tipoDocIdentidadRouter = Router();

tipoDocIdentidadRouter.get("/",getTDIHandler);
tipoDocIdentidadRouter.post("/",createTDIHandler);

module.exports = tipoDocIdentidadRouter;