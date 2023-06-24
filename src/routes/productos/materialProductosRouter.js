const {Router} = require("express");
const {getMaterialProductoHandler,createMaterialProductoHandler, deleteMaterialProductoHandler, updateMaterialProductoHandler}=require("../../handlers/productos/materialProductosHadlers");
const materialProductosRouter = Router();

materialProductosRouter.get("/",getMaterialProductoHandler);
materialProductosRouter.post("/",createMaterialProductoHandler);
materialProductosRouter.delete("/:id",deleteMaterialProductoHandler);
materialProductosRouter.put("/:id",updateMaterialProductoHandler);

module.exports = materialProductosRouter;