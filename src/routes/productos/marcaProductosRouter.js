const {Router} = require("express");
const {getMarcaProductoHandler,createMarcaProductoHandler, deleteMarcaProductoHandler, updateMarcaProductoHandler}=require("../../handlers/productos/marcaProductosHandlers");
const marcaProductosRouter = Router();

marcaProductosRouter.get("/",getMarcaProductoHandler);
marcaProductosRouter.post("/",createMarcaProductoHandler);
marcaProductosRouter.delete("/:id",deleteMarcaProductoHandler);
marcaProductosRouter.put("/:id",updateMarcaProductoHandler);

module.exports = marcaProductosRouter;