const {Router}=require("express");
const {getPreciosCliProvHandler,createPreciosCliProvHandler, deletePreciosCliProvHandler, updatePreciosCliProvHandler} = require("../../handlers/clientesProveedores/preciosCliProvHandlers");
const preciosCliProvRouter = Router();

preciosCliProvRouter.get("/",getPreciosCliProvHandler);
preciosCliProvRouter.post("/",createPreciosCliProvHandler);
preciosCliProvRouter.delete("/:id",deletePreciosCliProvHandler);
preciosCliProvRouter.put("/:id",updatePreciosCliProvHandler);

module.exports = preciosCliProvRouter;