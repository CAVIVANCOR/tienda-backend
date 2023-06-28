const {Router} = require("express");
const {getFamiliaProductoHandler,createFamiliaProductoHandler, deleteFamiliaProductoHandler, updateFamiliaProductoHandler, searchFamiliaProductoHandler}=require("../../handlers/productos/familiaProductosHandlers");
const familiaProductosRouter = Router();

familiaProductosRouter.get("/",getFamiliaProductoHandler);
familiaProductosRouter.post("/",createFamiliaProductoHandler);
familiaProductosRouter.delete("/:id",deleteFamiliaProductoHandler);
familiaProductosRouter.put("/:id",updateFamiliaProductoHandler);
familiaProductosRouter.get("/search/",searchFamiliaProductoHandler);

module.exports = familiaProductosRouter;