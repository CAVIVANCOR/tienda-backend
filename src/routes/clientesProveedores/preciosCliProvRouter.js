const {Router}=require("express");
const {getPreciosCliProvHandler} = require("../../handlers/clientesProveedores/preciosCliProvHandlers");
const preciosCliProvRouter = Router();

preciosCliProvRouter.get("/",getPreciosCliProvHandler);

module.exports = preciosCliProvRouter;