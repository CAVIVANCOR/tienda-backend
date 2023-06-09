const {Router}=require("express");
const {getDepartamentoHandler,createDepartamentoHandler} = require("../../handlers/clientesProveedores/departamentosHandlers");
const departamentosRouter = Router();

departamentosRouter.get("/",getDepartamentoHandler);
departamentosRouter.post("/",createDepartamentoHandler);

module.exports = departamentosRouter;