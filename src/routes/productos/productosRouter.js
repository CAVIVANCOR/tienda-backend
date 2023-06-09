const {Router} = require("express");
const {getProductoHandler,createProductoHandler}=require("../../handlers/productos/productosHandlers");
const productosRouter = Router();

productosRouter.get("/",getProductoHandler);
productosRouter.post("/",createProductoHandler);

module.exports = productosRouter;