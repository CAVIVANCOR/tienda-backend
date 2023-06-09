const {Router} = require("express");
const {getFamiliaProductoHandler,createFamiliaProductoHandler}=require("../../handlers/productos/familiaProductosHandlers");
const familiaProductosRouter = Router();

familiaProductosRouter.get("/",getFamiliaProductoHandler);
familiaProductosRouter.post("/",createFamiliaProductoHandler);

module.exports = familiaProductosRouter;