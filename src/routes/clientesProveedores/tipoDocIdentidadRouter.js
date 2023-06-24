const {Router}=require("express");
const {getTDIHandler,createTDIHandler, deleteTDIHandler} = require("../../handlers/clientesProveedores/tipoDocIdentidadHandlers");
const tipoDocIdentidadRouter = Router();

tipoDocIdentidadRouter.get("/",getTDIHandler);
tipoDocIdentidadRouter.post("/",createTDIHandler);
tipoDocIdentidadRouter.delete("/:id",deleteTDIHandler);

module.exports = tipoDocIdentidadRouter;