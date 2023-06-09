const {Router} = require("express");
const {getEstadoProductoHandler,createEstadoProductoHandler}=require("../../handlers/productos/estadoProductosHandlers");
const estadoProductosRouter = Router();

estadoProductosRouter.get("/",getEstadoProductoHandler);
estadoProductosRouter.post("/",createEstadoProductoHandler);

module.exports = estadoProductosRouter;