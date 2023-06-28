const {Router} = require("express");
const {getMaterialProductoHandler,createMaterialProductoHandler, deleteMaterialProductoHandler, updateMaterialProductoHandler, searchMaterialProductoHandler}=require("../../handlers/productos/materialProductosHadlers");
const materialProductosRouter = Router();

materialProductosRouter.get("/",getMaterialProductoHandler);
materialProductosRouter.post("/",createMaterialProductoHandler);
materialProductosRouter.delete("/:id",deleteMaterialProductoHandler);
materialProductosRouter.put("/:id",updateMaterialProductoHandler);
materialProductosRouter.get("/search/",searchMaterialProductoHandler);

module.exports = materialProductosRouter;