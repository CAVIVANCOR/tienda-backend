const {Router} = require("express");
const {getUMProductoHandler,createUMProductoHandler, deleteUMProductoHandler, updateUMProductoHandler, searchUMProductoHandler}=require("../../handlers/productos/umProductosHandlers");
const umProductosRouter = Router();

umProductosRouter.get("/",getUMProductoHandler);
umProductosRouter.post("/",createUMProductoHandler);
umProductosRouter.delete("/:id",deleteUMProductoHandler);
umProductosRouter.put("/:id",updateUMProductoHandler);
umProductosRouter.get("/search/",searchUMProductoHandler);

module.exports = umProductosRouter;