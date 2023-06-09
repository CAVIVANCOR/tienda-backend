const {Router}=require("express");
const {getPreciosCliProvHandler,createPreciosCliProvHandler} = require("../../handlers/clientesProveedores/preciosCliProvHandlers");
const preciosCliProvRouter = Router();

preciosCliProvRouter.get("/",getPreciosCliProvHandler);
preciosCliProvRouter.post("/",createPreciosCliProvHandler);

module.exports = preciosCliProvRouter;