const {Router} = require("express");
const {getUMProductoHandler,createUMProductoHandler, deleteUMProductoHandler}=require("../../handlers/productos/umProductosHandlers");
const umProductosRouter = Router();

umProductosRouter.get("/",getUMProductoHandler);
umProductosRouter.post("/",createUMProductoHandler);
umProductosRouter.delete("/:id",deleteUMProductoHandler);

module.exports = umProductosRouter;