const {Router} = require("express");
const {getAnoProductoHandler,createAnoProductoHandler}=require("../../handlers/productos/anoProductosHandlers");
const anoProductosRouter = Router();

anoProductosRouter.get("/",getAnoProductoHandler);
anoProductosRouter.post("/",createAnoProductoHandler);

module.exports = anoProductosRouter;