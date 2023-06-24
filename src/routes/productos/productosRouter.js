const {Router} = require("express");
const {getProductoHandler,createProductoHandler, deleteProductoHandler}=require("../../handlers/productos/productosHandlers");
const productosRouter = Router();

productosRouter.get("/",getProductoHandler);
productosRouter.post("/",createProductoHandler);
productosRouter.delete("/:id",deleteProductoHandler);

module.exports = productosRouter;