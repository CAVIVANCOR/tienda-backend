const {Router} = require("express");
const {getProcedenciaProductoHandler,createProcedenciaProductoHandler, deleteProcedenciaProductoHandler, updateProcedenciaProductoHandler, searchProcedenciaProductoHandler}=require("../../handlers/productos/procedenciaProductosHandlers");
const procedenciaProductosRouter = Router();

procedenciaProductosRouter.get("/",getProcedenciaProductoHandler);
procedenciaProductosRouter.post("/",createProcedenciaProductoHandler);
procedenciaProductosRouter.delete("/:id",deleteProcedenciaProductoHandler);
procedenciaProductosRouter.put("/:id",updateProcedenciaProductoHandler);
procedenciaProductosRouter.get("/search/",searchProcedenciaProductoHandler);

module.exports = procedenciaProductosRouter;