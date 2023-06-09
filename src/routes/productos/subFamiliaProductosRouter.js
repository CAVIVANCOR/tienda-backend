const {Router} = require("express");
const {getSubFamiliaProductoHandler,createSubFamiliaProductoHandler}=require("../../handlers/productos/subFamiliaProductosHandlers");
const subFamiliaProductosRouter = Router();

subFamiliaProductosRouter.get("/",getSubFamiliaProductoHandler);
subFamiliaProductosRouter.post("/",createSubFamiliaProductoHandler);

module.exports = subFamiliaProductosRouter;