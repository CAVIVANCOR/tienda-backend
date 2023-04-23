const {Router}=require("express");
const {getDepartamentoHandler} = require("../handlers/departamentosHandlers");
const departamentosRouter = Router();

departamentosRouter.get("/",getDepartamentoHandler);

module.exports = departamentosRouter;