const {Router} = require("express");
const {getTipoExistenciaContHandler,createTipoExistenciaContHandler}=require("../../handlers/productos/tipoExistenciasContHandlers");
const tipoExistenciaContProductosRouter = Router();

tipoExistenciaContProductosRouter.get("/",getTipoExistenciaContHandler);
tipoExistenciaContProductosRouter.post("/",createTipoExistenciaContHandler);

module.exports = tipoExistenciaContProductosRouter;