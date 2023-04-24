const {Router}=require("express");
const {getDistritoHandler} = require("../../handlers/clientesProveedores/DistritosHandlers");
const distritosRouter = Router();

distritosRouter.get("/",getDistritoHandler);

module.exports = distritosRouter;