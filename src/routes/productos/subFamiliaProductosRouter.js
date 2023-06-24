const {Router} = require("express");
const {getSubFamiliaProductoHandler,createSubFamiliaProductoHandler, deleteSubFamiliaProductoHandler}=require("../../handlers/productos/subFamiliaProductosHandlers");
const subFamiliaProductosRouter = Router();

subFamiliaProductosRouter.get("/",getSubFamiliaProductoHandler);
subFamiliaProductosRouter.post("/",createSubFamiliaProductoHandler);
subFamiliaProductosRouter.delete("/:id",deleteSubFamiliaProductoHandler);

module.exports = subFamiliaProductosRouter;