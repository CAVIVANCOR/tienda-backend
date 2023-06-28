const {Router} = require("express");
const {getProductoHandler,createProductoHandler, deleteProductoHandler, updateProductoHandler, searchProductosHandler}=require("../../handlers/productos/productosHandlers");
const productosRouter = Router();

productosRouter.get("/",getProductoHandler);
productosRouter.post("/",createProductoHandler);
productosRouter.delete("/:id",deleteProductoHandler);
productosRouter.put("/:id",updateProductoHandler);
productosRouter.get("/search/",searchProductosHandler);

module.exports = productosRouter;