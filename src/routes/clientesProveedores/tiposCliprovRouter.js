const {Router}=require("express");
const {getTipoCliProvHandler,createTipoCliProvHandler, deleteTipoCliProvHandler} = require("../../handlers/clientesProveedores/tiposCliProvHandlers");
const tipoCliProvRouter = Router();

tipoCliProvRouter.get("/",getTipoCliProvHandler);
tipoCliProvRouter.post("/",createTipoCliProvHandler);
tipoCliProvRouter.delete("/:id",deleteTipoCliProvHandler);

module.exports = tipoCliProvRouter;