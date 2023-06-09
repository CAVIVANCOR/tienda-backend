const {Router} = require("express");
const {getDetMovAlmacenHandler,createDetMovAlmacenHandler, deleteDetMovAlmacenHandler}=require("../../handlers/almacen/detMovAlmacenHandlers");
const detMovAlmacenRouter = Router();

detMovAlmacenRouter.get("/",getDetMovAlmacenHandler);
detMovAlmacenRouter.post("/",createDetMovAlmacenHandler);
detMovAlmacenRouter.delete("/:id",deleteDetMovAlmacenHandler);

module.exports = detMovAlmacenRouter;