const {Router} = require("express");
const {getAnoProductoHandler,createAnoProductoHandler, deleteAnoProductoHandler, updateAnoProductoHandler, searchAnoProductoHandler}=require("../../handlers/productos/anoProductosHandlers");
const anoProductosRouter = Router();

anoProductosRouter.get("/",getAnoProductoHandler);
anoProductosRouter.post("/",createAnoProductoHandler);
anoProductosRouter.delete("/:id",deleteAnoProductoHandler);
anoProductosRouter.put("/:id",updateAnoProductoHandler);
anoProductosRouter.get("/search/",searchAnoProductoHandler);

module.exports = anoProductosRouter;