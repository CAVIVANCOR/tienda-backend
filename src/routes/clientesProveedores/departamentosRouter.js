const {Router}=require("express");
const {getDepartamentoHandler,createDepartamentoHandler, deleteDepartamentoHandler} = require("../../handlers/clientesProveedores/departamentosHandlers");
const departamentosRouter = Router();

departamentosRouter.get("/",getDepartamentoHandler);
departamentosRouter.post("/",createDepartamentoHandler);
departamentosRouter.delete("/:id",deleteDepartamentoHandler);

module.exports = departamentosRouter;