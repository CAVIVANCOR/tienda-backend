const {Router} = require("express");
const {getModeloMarcaProductoHandler,createModeloMarcaProductoHandler, deleteModeloMarcaProductoHandler}=require("../../handlers/productos/modeloMarcaProductosHandler");
const modeloMarcaProductosRouter = Router();

modeloMarcaProductosRouter.get("/",getModeloMarcaProductoHandler);
modeloMarcaProductosRouter.post("/",createModeloMarcaProductoHandler);
modeloMarcaProductosRouter.delete("/:id",deleteModeloMarcaProductoHandler);

module.exports = modeloMarcaProductosRouter;