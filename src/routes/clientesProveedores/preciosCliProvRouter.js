const {Router}=require("express");
const {getPreciosCliProvHandler,createPreciosCliProvHandler, deletePreciosCliProvHandler, updatePreciosCliProvHandler, searchPreciosCliProvHandler} = require("../../handlers/clientesProveedores/preciosCliProvHandlers");
const preciosCliProvRouter = Router();

preciosCliProvRouter.get("/",getPreciosCliProvHandler);
preciosCliProvRouter.post("/",createPreciosCliProvHandler);
preciosCliProvRouter.delete("/:id",deletePreciosCliProvHandler);
preciosCliProvRouter.put("/:id",updatePreciosCliProvHandler);
preciosCliProvRouter.get("/search/",searchPreciosCliProvHandler);

module.exports = preciosCliProvRouter;