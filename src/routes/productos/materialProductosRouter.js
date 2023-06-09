const {Router} = require("express");
const {getMaterialProductoHandler,createMaterialProductoHandler}=require("../../handlers/productos/materialProductosHadlers");
const materialProductosRouter = Router();

materialProductosRouter.get("/",getMaterialProductoHandler);
materialProductosRouter.post("/",createMaterialProductoHandler);

module.exports = materialProductosRouter;