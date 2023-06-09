const {Router}=require("express");
const {getTipoCliProvHandler,createTipoCliProvHandler} = require("../../handlers/clientesProveedores/tiposCliProvHandlers");
const tipoCliProvRouter = Router();

tipoCliProvRouter.get("/",getTipoCliProvHandler);
tipoCliProvRouter.post("/",createTipoCliProvHandler);

module.exports = tipoCliProvRouter;