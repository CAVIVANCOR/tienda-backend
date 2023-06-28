const {Router} = require("express");
const {getColorProductoHandler,createColorProductoHandler,deleteColorProductoHandler, updateColorProductoHandler, searchColorProductoHandler}=require("../../handlers/productos/colorProductosHandlers");
const colorProductosRouter = Router();

colorProductosRouter.get("/",getColorProductoHandler);
colorProductosRouter.post("/",createColorProductoHandler);
colorProductosRouter.delete("/:id",deleteColorProductoHandler);
colorProductosRouter.put("/:id",updateColorProductoHandler);
colorProductosRouter.get("/search/",searchColorProductoHandler);

module.exports = colorProductosRouter;