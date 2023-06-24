const {Router} = require("express");
const {getSubFamiliaProductoHandler,createSubFamiliaProductoHandler, deleteSubFamiliaProductoHandler, updateSubFamiliaProductoHandler}=require("../../handlers/productos/subFamiliaProductosHandlers");
const subFamiliaProductosRouter = Router();

subFamiliaProductosRouter.get("/",getSubFamiliaProductoHandler);
subFamiliaProductosRouter.post("/",createSubFamiliaProductoHandler);
subFamiliaProductosRouter.delete("/:id",deleteSubFamiliaProductoHandler);
subFamiliaProductosRouter.put("/:id",updateSubFamiliaProductoHandler);

module.exports = subFamiliaProductosRouter;