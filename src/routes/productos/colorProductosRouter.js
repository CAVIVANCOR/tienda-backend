const {Router} = require("express");
const {getColorProductoHandler,createColorProductoHandler,deleteColorProductoHandler}=require("../../handlers/productos/colorProductosHandlers");
const colorProductosRouter = Router();

colorProductosRouter.get("/",getColorProductoHandler);
colorProductosRouter.post("/",createColorProductoHandler);
colorProductosRouter.delete("/:id",deleteColorProductoHandler);

module.exports = colorProductosRouter;