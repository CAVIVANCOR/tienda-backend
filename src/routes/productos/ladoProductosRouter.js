const {Router} = require("express");
const {getLadoProductoHandler,createLadoProductoHandler, deleteLadoProductoHandler}=require("../../handlers/productos/ladoProductosHandlers");
const ladoProductosRouter = Router();

ladoProductosRouter.get("/",getLadoProductoHandler);
ladoProductosRouter.post("/",createLadoProductoHandler);
ladoProductosRouter.delete("/:id",deleteLadoProductoHandler);

module.exports = ladoProductosRouter;