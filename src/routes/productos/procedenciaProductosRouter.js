const {Router} = require("express");
const {getProcedenciaProductoHandler,createProcedenciaProductoHandler, deleteProcedenciaProductoHandler}=require("../../handlers/productos/procedenciaProductosHandlers");
const procedenciaProductosRouter = Router();

procedenciaProductosRouter.get("/",getProcedenciaProductoHandler);
procedenciaProductosRouter.post("/",createProcedenciaProductoHandler);
procedenciaProductosRouter.delete("/:id",deleteProcedenciaProductoHandler);

module.exports = procedenciaProductosRouter;