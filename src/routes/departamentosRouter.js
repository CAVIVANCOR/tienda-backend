const {Router}=require("express");
const {getDepartamentoHandler} = require("../handlers/departamentosHandlers");
const departamentoRouter = Router();

departamentoRouter.get("/",getDepartamentoHandler);

module.exports = departamentoRouter;