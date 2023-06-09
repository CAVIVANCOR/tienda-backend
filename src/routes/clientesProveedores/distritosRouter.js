const {Router}=require("express");
const {getDistritoHandler,createDistritoHandler} = require("../../handlers/clientesProveedores/DistritosHandlers");
const distritosRouter = Router();

distritosRouter.get("/",getDistritoHandler);
distritosRouter.post("/",createDistritoHandler);

module.exports = distritosRouter;