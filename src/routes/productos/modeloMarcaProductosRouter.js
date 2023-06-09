const {Router} = require("express");
const {getModeloMarcaProductoHandler,createModeloMarcaProductoHandler}=require("../../handlers/productos/modeloMarcaProductosHandler");
const modeloMarcaProductosRouter = Router();

modeloMarcaProductosRouter.get("/",getModeloMarcaProductoHandler);
modeloMarcaProductosRouter.post("/",createModeloMarcaProductoHandler);

module.exports = modeloMarcaProductosRouter;