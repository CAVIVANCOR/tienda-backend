const {Router} = require("express");
const {getMarcaProductoHandler,createMarcaProductoHandler, deleteMarcaProductoHandler}=require("../../handlers/productos/marcaProductosHandlers");
const marcaProductosRouter = Router();

marcaProductosRouter.get("/",getMarcaProductoHandler);
marcaProductosRouter.post("/",createMarcaProductoHandler);
marcaProductosRouter.delete("/:id",deleteMarcaProductoHandler);

module.exports = marcaProductosRouter;