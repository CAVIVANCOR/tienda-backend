const {Router}=require("express");
const {getTDIHandler,createTDIHandler, deleteTDIHandler, updateTDIHandler} = require("../../handlers/clientesProveedores/tipoDocIdentidadHandlers");
const tipoDocIdentidadRouter = Router();

tipoDocIdentidadRouter.get("/",getTDIHandler);
tipoDocIdentidadRouter.post("/",createTDIHandler);
tipoDocIdentidadRouter.delete("/:id",deleteTDIHandler);
tipoDocIdentidadRouter.put("/:id",updateTDIHandler);

module.exports = tipoDocIdentidadRouter;