const {Router}=require("express");
const {getDepartamentoHandler} = require("../../handlers/clientesProveedores/departamentosHandlers");
const departamentosRouter = Router();

departamentosRouter.get("/",getDepartamentoHandler);

module.exports = departamentosRouter;