const {Router}=require("express");
const {getPreciosCliProvHandler,createPreciosCliProvHandler, deletePreciosCliProvHandler} = require("../../handlers/clientesProveedores/preciosCliProvHandlers");
const preciosCliProvRouter = Router();

preciosCliProvRouter.get("/",getPreciosCliProvHandler);
preciosCliProvRouter.post("/",createPreciosCliProvHandler);
preciosCliProvRouter.delete("/:id",deletePreciosCliProvHandler);

module.exports = preciosCliProvRouter;