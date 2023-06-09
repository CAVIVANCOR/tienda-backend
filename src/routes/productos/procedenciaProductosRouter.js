const {Router} = require("express");
const {getProcedenciaProductoHandler,createProcedenciaProductoHandler}=require("../../handlers/productos/procedenciaProductosHandlers");
const procedenciaProductosRouter = Router();

procedenciaProductosRouter.get("/",getProcedenciaProductoHandler);
procedenciaProductosRouter.post("/",createProcedenciaProductoHandler);

module.exports = procedenciaProductosRouter;