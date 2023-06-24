const {Router} = require("express");
const {getAnoProductoHandler,createAnoProductoHandler, deleteAnoProductoHandler}=require("../../handlers/productos/anoProductosHandlers");
const anoProductosRouter = Router();

anoProductosRouter.get("/",getAnoProductoHandler);
anoProductosRouter.post("/",createAnoProductoHandler);
anoProductosRouter.delete("/:id",deleteAnoProductoHandler);

module.exports = anoProductosRouter;