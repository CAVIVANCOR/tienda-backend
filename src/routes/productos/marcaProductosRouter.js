const {Router} = require("express");
const {getMarcaProductoHandler,createMarcaProductoHandler, deleteMarcaProductoHandler, updateMarcaProductoHandler, searchMarcaProductoHandler}=require("../../handlers/productos/marcaProductosHandlers");
const marcaProductosRouter = Router();

marcaProductosRouter.get("/",getMarcaProductoHandler);
marcaProductosRouter.post("/",createMarcaProductoHandler);
marcaProductosRouter.delete("/:id",deleteMarcaProductoHandler);
marcaProductosRouter.put("/:id",updateMarcaProductoHandler);
marcaProductosRouter.get("/search/",searchMarcaProductoHandler);

module.exports = marcaProductosRouter;