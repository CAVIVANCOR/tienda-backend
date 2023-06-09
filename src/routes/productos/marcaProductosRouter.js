const {Router} = require("express");
const {getMarcaProductoHandler,createMarcaProductoHandler}=require("../../handlers/productos/marcaProductosHandlers");
const marcaProductosRouter = Router();

marcaProductosRouter.get("/",getMarcaProductoHandler);
marcaProductosRouter.post("/",createMarcaProductoHandler);

module.exports = marcaProductosRouter;