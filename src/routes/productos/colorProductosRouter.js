const {Router} = require("express");
const {getColorProductoHandler,createColorProductoHandler}=require("../../handlers/productos/colorProductosHandlers");
const colorProductosRouter = Router();

colorProductosRouter.get("/",getColorProductoHandler);
colorProductosRouter.post("/",createColorProductoHandler);

module.exports = colorProductosRouter;