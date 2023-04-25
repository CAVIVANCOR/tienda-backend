const {Router}=require("express");
const {getTipoCliProvHandler} = require("../../handlers/clientesProveedores/tiposCliProvHandlers");
const tipoCliProvRouter = Router();

tipoCliProvRouter.get("/",getTipoCliProvHandler);

module.exports = tipoCliProvRouter;