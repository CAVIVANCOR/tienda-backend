const {Router} = require("express");
const {getColorProductoHandler,createColorProductoHandler,deleteColorProductoHandler, updateColorProductoHandler}=require("../../handlers/productos/colorProductosHandlers");
const colorProductosRouter = Router();

colorProductosRouter.get("/",getColorProductoHandler);
colorProductosRouter.post("/",createColorProductoHandler);
colorProductosRouter.delete("/:id",deleteColorProductoHandler);
colorProductosRouter.put("/:id",updateColorProductoHandler);

module.exports = colorProductosRouter;