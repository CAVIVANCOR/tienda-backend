const {Router}=require("express");
const {getDepartamentoHandler,createDepartamentoHandler, deleteDepartamentoHandler, updateDepartamentoHandler, searchDepartamentoHandler} = require("../../handlers/clientesProveedores/departamentosHandlers");
const departamentosRouter = Router();

departamentosRouter.get("/",getDepartamentoHandler);
departamentosRouter.post("/",createDepartamentoHandler);
departamentosRouter.delete("/:id",deleteDepartamentoHandler);
departamentosRouter.put("/:id",updateDepartamentoHandler);
departamentosRouter.get("/search/",searchDepartamentoHandler);

module.exports = departamentosRouter;