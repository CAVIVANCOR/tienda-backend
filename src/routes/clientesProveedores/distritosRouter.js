const {Router}=require("express");
const {getDistritoHandler,createDistritoHandler, deleteDistritoHandler, updateDistritoHandler} = require("../../handlers/clientesProveedores/DistritosHandlers");
const distritosRouter = Router();

distritosRouter.get("/",getDistritoHandler);
distritosRouter.post("/",createDistritoHandler);
distritosRouter.delete("/:id",deleteDistritoHandler);
distritosRouter.put("/:id",updateDistritoHandler);

module.exports = distritosRouter;