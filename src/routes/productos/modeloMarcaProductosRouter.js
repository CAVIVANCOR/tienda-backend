const {Router} = require("express");
const {getModeloMarcaProductoHandler,createModeloMarcaProductoHandler, deleteModeloMarcaProductoHandler, updateModeloMarcaProductoHandler}=require("../../handlers/productos/modeloMarcaProductosHandler");
const modeloMarcaProductosRouter = Router();

modeloMarcaProductosRouter.get("/",getModeloMarcaProductoHandler);
modeloMarcaProductosRouter.post("/",createModeloMarcaProductoHandler);
modeloMarcaProductosRouter.delete("/:id",deleteModeloMarcaProductoHandler);
modeloMarcaProductosRouter.put("/:id",updateModeloMarcaProductoHandler);

module.exports = modeloMarcaProductosRouter;