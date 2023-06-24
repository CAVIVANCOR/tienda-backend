const {Router} = require("express");
const {getUMProductoHandler,createUMProductoHandler, deleteUMProductoHandler, updateUMProductoHandler}=require("../../handlers/productos/umProductosHandlers");
const umProductosRouter = Router();

umProductosRouter.get("/",getUMProductoHandler);
umProductosRouter.post("/",createUMProductoHandler);
umProductosRouter.delete("/:id",deleteUMProductoHandler);
umProductosRouter.put("/:id",updateUMProductoHandler);

module.exports = umProductosRouter;