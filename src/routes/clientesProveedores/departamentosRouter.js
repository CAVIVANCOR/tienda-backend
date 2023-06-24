const {Router}=require("express");
const {getDepartamentoHandler,createDepartamentoHandler, deleteDepartamentoHandler, updateDepartamentoHandler} = require("../../handlers/clientesProveedores/departamentosHandlers");
const departamentosRouter = Router();

departamentosRouter.get("/",getDepartamentoHandler);
departamentosRouter.post("/",createDepartamentoHandler);
departamentosRouter.delete("/:id",deleteDepartamentoHandler);
departamentosRouter.put("/:id",updateDepartamentoHandler);

module.exports = departamentosRouter;