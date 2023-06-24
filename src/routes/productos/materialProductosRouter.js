const {Router} = require("express");
const {getMaterialProductoHandler,createMaterialProductoHandler, deleteMaterialProductoHandler}=require("../../handlers/productos/materialProductosHadlers");
const materialProductosRouter = Router();

materialProductosRouter.get("/",getMaterialProductoHandler);
materialProductosRouter.post("/",createMaterialProductoHandler);
materialProductosRouter.delete("/:id",deleteMaterialProductoHandler);

module.exports = materialProductosRouter;