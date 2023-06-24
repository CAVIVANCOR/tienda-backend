const {Router} = require("express");
const {getLadoProductoHandler,createLadoProductoHandler, deleteLadoProductoHandler, updateLadoProductoHandler}=require("../../handlers/productos/ladoProductosHandlers");
const ladoProductosRouter = Router();

ladoProductosRouter.get("/",getLadoProductoHandler);
ladoProductosRouter.post("/",createLadoProductoHandler);
ladoProductosRouter.delete("/:id",deleteLadoProductoHandler);
ladoProductosRouter.put("/:id",updateLadoProductoHandler);

module.exports = ladoProductosRouter;