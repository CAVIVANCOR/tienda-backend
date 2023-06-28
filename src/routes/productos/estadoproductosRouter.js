const {Router} = require("express");
const {getEstadoProductoHandler,createEstadoProductoHandler, deleteEstadoProductoHandler, updateEstadoProductoHandler, searchEstadoProductoHandler}=require("../../handlers/productos/estadoProductosHandlers");
const estadoProductosRouter = Router();

estadoProductosRouter.get("/",getEstadoProductoHandler);
estadoProductosRouter.post("/",createEstadoProductoHandler);
estadoProductosRouter.delete("/:id",deleteEstadoProductoHandler);
estadoProductosRouter.put("/:id",updateEstadoProductoHandler);
estadoProductosRouter.get("/search/",searchEstadoProductoHandler);

module.exports = estadoProductosRouter;