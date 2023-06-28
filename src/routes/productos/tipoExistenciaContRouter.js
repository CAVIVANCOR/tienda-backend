const {Router} = require("express");
const {getTipoExistenciaContHandler,createTipoExistenciaContHandler, deleteTipoExistenciaContHandler, updateTipoExistenciaContHandler, searchTipoExistenciaContHandler}=require("../../handlers/productos/tipoExistenciasContHandlers");
const tipoExistenciaContProductosRouter = Router();

tipoExistenciaContProductosRouter.get("/",getTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.post("/",createTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.delete("/:id",deleteTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.put("/:id",updateTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.get("/search/",searchTipoExistenciaContHandler);

module.exports = tipoExistenciaContProductosRouter;