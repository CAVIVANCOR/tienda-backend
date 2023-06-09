const {Router} = require("express");
const {getCabMovAlmacenHandler,createCabMovAlmacenHandler, deleteCabMovAlmacenHandler}=require("../../handlers/almacen/cabMovAlmacenHandlers");
const cabMovAlmacenRouter = Router();

cabMovAlmacenRouter.get("/",getCabMovAlmacenHandler);
cabMovAlmacenRouter.post("/",createCabMovAlmacenHandler);
cabMovAlmacenRouter.delete("/:id",deleteCabMovAlmacenHandler);

module.exports = cabMovAlmacenRouter;