const {Router} = require("express");
const {getModeloMarcaProductoHandler,createModeloMarcaProductoHandler, deleteModeloMarcaProductoHandler, updateModeloMarcaProductoHandler, searchModeloMarcaProductoHandler}=require("../../handlers/productos/modeloMarcaProductosHandler");
const modeloMarcaProductosRouter = Router();

modeloMarcaProductosRouter.get("/",getModeloMarcaProductoHandler);
modeloMarcaProductosRouter.post("/",createModeloMarcaProductoHandler);
modeloMarcaProductosRouter.delete("/:id",deleteModeloMarcaProductoHandler);
modeloMarcaProductosRouter.put("/:id",updateModeloMarcaProductoHandler);
modeloMarcaProductosRouter.get("/search/",searchModeloMarcaProductoHandler);

module.exports = modeloMarcaProductosRouter;