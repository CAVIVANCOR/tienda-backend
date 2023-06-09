const {Router} = require("express");
const {getTipoMovAlmacenHandler,createTipoMovAlmacenHandler, deleteTipoMovAlmacenHandler}=require("../../handlers/almacen/tipoMovAlmacenHandlers");
const tipoMovAlmacenRouter = Router();

tipoMovAlmacenRouter.get("/",getTipoMovAlmacenHandler);
tipoMovAlmacenRouter.post("/",createTipoMovAlmacenHandler);
tipoMovAlmacenRouter.delete("/:id",deleteTipoMovAlmacenHandler);

module.exports = tipoMovAlmacenRouter;