const {Router} = require("express");
const {getFamiliaProductoHandler,createFamiliaProductoHandler, deleteFamiliaProductoHandler}=require("../../handlers/productos/familiaProductosHandlers");
const familiaProductosRouter = Router();

familiaProductosRouter.get("/",getFamiliaProductoHandler);
familiaProductosRouter.post("/",createFamiliaProductoHandler);
familiaProductosRouter.delete("/:id",deleteFamiliaProductoHandler);

module.exports = familiaProductosRouter;