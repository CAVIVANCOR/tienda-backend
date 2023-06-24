const {Router} = require("express");
const {getFamiliaProductoHandler,createFamiliaProductoHandler, deleteFamiliaProductoHandler, updateFamiliaProductoHandler}=require("../../handlers/productos/familiaProductosHandlers");
const familiaProductosRouter = Router();

familiaProductosRouter.get("/",getFamiliaProductoHandler);
familiaProductosRouter.post("/",createFamiliaProductoHandler);
familiaProductosRouter.delete("/:id",deleteFamiliaProductoHandler);
familiaProductosRouter.put("/:id",updateFamiliaProductoHandler);

module.exports = familiaProductosRouter;