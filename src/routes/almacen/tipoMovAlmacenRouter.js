const {Router} = require("express");
const {getTipoMovAlmacenHandler,createTipoMovAlmacenHandler, deleteTipoMovAlmacenHandler, updateTipoMovAlmacenHandler, searchTipoMovAlmacenHandler}=require("../../handlers/almacen/tipoMovAlmacenHandlers");
const tipoMovAlmacenRouter = Router();

tipoMovAlmacenRouter.get("/",getTipoMovAlmacenHandler);
tipoMovAlmacenRouter.post("/",createTipoMovAlmacenHandler);
tipoMovAlmacenRouter.delete("/:id",deleteTipoMovAlmacenHandler);
tipoMovAlmacenRouter.put("/:id",updateTipoMovAlmacenHandler);
tipoMovAlmacenRouter.get("/search/",searchTipoMovAlmacenHandler);

module.exports = tipoMovAlmacenRouter;