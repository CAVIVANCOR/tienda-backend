const {Router} = require("express");
const {getLadoProductoHandler,createLadoProductoHandler}=require("../../handlers/productos/ladoProductosHandlers");
const ladoProductosRouter = Router();

ladoProductosRouter.get("/",getLadoProductoHandler);
ladoProductosRouter.post("/",createLadoProductoHandler);

module.exports = ladoProductosRouter;