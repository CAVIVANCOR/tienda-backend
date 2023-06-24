const {Router}=require("express");
const {getTipoCliProvHandler,createTipoCliProvHandler, deleteTipoCliProvHandler, updateTipoCliProvHandler} = require("../../handlers/clientesProveedores/tiposCliProvHandlers");
const tipoCliProvRouter = Router();

tipoCliProvRouter.get("/",getTipoCliProvHandler);
tipoCliProvRouter.post("/",createTipoCliProvHandler);
tipoCliProvRouter.delete("/:id",deleteTipoCliProvHandler);
tipoCliProvRouter.put("/:id",updateTipoCliProvHandler);

module.exports = tipoCliProvRouter;