const {Router}=require("express");
const {getDistritoHandler,createDistritoHandler, deleteDistritoHandler} = require("../../handlers/clientesProveedores/DistritosHandlers");
const distritosRouter = Router();

distritosRouter.get("/",getDistritoHandler);
distritosRouter.post("/",createDistritoHandler);
distritosRouter.delete("/:id",deleteDistritoHandler);

module.exports = distritosRouter;