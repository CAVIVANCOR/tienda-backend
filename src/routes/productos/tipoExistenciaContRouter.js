const {Router} = require("express");
const {getTipoExistenciaContHandler,createTipoExistenciaContHandler, deleteTipoExistenciaContHandler, updateTipoExistenciaContHandler}=require("../../handlers/productos/tipoExistenciasContHandlers");
const tipoExistenciaContProductosRouter = Router();

tipoExistenciaContProductosRouter.get("/",getTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.post("/",createTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.delete("/:id",deleteTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.put("/:id",updateTipoExistenciaContHandler);

module.exports = tipoExistenciaContProductosRouter;