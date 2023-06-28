const {Router}=require("express");
const {getDistritoHandler,createDistritoHandler, deleteDistritoHandler, updateDistritoHandler, searchDistritosHandler} = require("../../handlers/clientesProveedores/DistritosHandlers");
const distritosRouter = Router();

distritosRouter.get("/",getDistritoHandler);
distritosRouter.post("/",createDistritoHandler);
distritosRouter.delete("/:id",deleteDistritoHandler);
distritosRouter.put("/:id",updateDistritoHandler);
distritosRouter.get("/search/",searchDistritosHandler);

module.exports = distritosRouter;