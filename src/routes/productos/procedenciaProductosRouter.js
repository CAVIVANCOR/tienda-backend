const {Router} = require("express");
const {getProcedenciaProductoHandler,createProcedenciaProductoHandler, deleteProcedenciaProductoHandler, updateProcedenciaProductoHandler}=require("../../handlers/productos/procedenciaProductosHandlers");
const procedenciaProductosRouter = Router();

procedenciaProductosRouter.get("/",getProcedenciaProductoHandler);
procedenciaProductosRouter.post("/",createProcedenciaProductoHandler);
procedenciaProductosRouter.delete("/:id",deleteProcedenciaProductoHandler);
procedenciaProductosRouter.put("/:id",updateProcedenciaProductoHandler);

module.exports = procedenciaProductosRouter;