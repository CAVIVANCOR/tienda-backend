const {Router} = require("express");
const {getEstadoProductoHandler,createEstadoProductoHandler, deleteEstadoProductoHandler}=require("../../handlers/productos/estadoProductosHandlers");
const estadoProductosRouter = Router();

estadoProductosRouter.get("/",getEstadoProductoHandler);
estadoProductosRouter.post("/",createEstadoProductoHandler);
estadoProductosRouter.delete("/:id",deleteEstadoProductoHandler);

module.exports = estadoProductosRouter;