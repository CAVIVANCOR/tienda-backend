const {Router} = require("express");
const {getAnoProductoHandler,createAnoProductoHandler, deleteAnoProductoHandler, updateAnoProductoHandler}=require("../../handlers/productos/anoProductosHandlers");
const anoProductosRouter = Router();

anoProductosRouter.get("/",getAnoProductoHandler);
anoProductosRouter.post("/",createAnoProductoHandler);
anoProductosRouter.delete("/:id",deleteAnoProductoHandler);
anoProductosRouter.put("/:id",updateAnoProductoHandler);

module.exports = anoProductosRouter;