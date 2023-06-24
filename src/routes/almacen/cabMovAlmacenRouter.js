const {Router} = require("express");
const {getCabMovAlmacenHandler,createCabMovAlmacenHandler, deleteCabMovAlmacenHandler, updateCabMovAlmacenHandler}=require("../../handlers/almacen/cabMovAlmacenHandlers");
const cabMovAlmacenRouter = Router();

cabMovAlmacenRouter.get("/",getCabMovAlmacenHandler);
cabMovAlmacenRouter.post("/",createCabMovAlmacenHandler);
cabMovAlmacenRouter.delete("/:id",deleteCabMovAlmacenHandler);
cabMovAlmacenRouter.put("/:id",updateCabMovAlmacenHandler);

module.exports = cabMovAlmacenRouter;