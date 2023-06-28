const {Router} = require("express");
const {getLadoProductoHandler,createLadoProductoHandler, deleteLadoProductoHandler, updateLadoProductoHandler, searchLadoProductoHandler}=require("../../handlers/productos/ladoProductosHandlers");
const ladoProductosRouter = Router();

ladoProductosRouter.get("/",getLadoProductoHandler);
ladoProductosRouter.post("/",createLadoProductoHandler);
ladoProductosRouter.delete("/:id",deleteLadoProductoHandler);
ladoProductosRouter.put("/:id",updateLadoProductoHandler);
ladoProductosRouter.get("/search/",searchLadoProductoHandler);

module.exports = ladoProductosRouter;