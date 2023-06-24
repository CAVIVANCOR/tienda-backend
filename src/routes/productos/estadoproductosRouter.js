const {Router} = require("express");
const {getEstadoProductoHandler,createEstadoProductoHandler, deleteEstadoProductoHandler, updateEstadoProductoHandler}=require("../../handlers/productos/estadoProductosHandlers");
const estadoProductosRouter = Router();

estadoProductosRouter.get("/",getEstadoProductoHandler);
estadoProductosRouter.post("/",createEstadoProductoHandler);
estadoProductosRouter.delete("/:id",deleteEstadoProductoHandler);
estadoProductosRouter.put("/:id",updateEstadoProductoHandler);

module.exports = estadoProductosRouter;