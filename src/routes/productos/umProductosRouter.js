const {Router} = require("express");
const {getUMProductoHandler,createUMProductoHandler}=require("../../handlers/productos/umProductosHandlers");
const umProductosRouter = Router();

umProductosRouter.get("/",getUMProductoHandler);
umProductosRouter.post("/",createUMProductoHandler);

module.exports = umProductosRouter;