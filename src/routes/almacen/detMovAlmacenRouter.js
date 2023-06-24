const {Router} = require("express");
const {getDetMovAlmacenHandler,createDetMovAlmacenHandler, deleteDetMovAlmacenHandler, updateDetMovAlmacenHandler}=require("../../handlers/almacen/detMovAlmacenHandlers");
const detMovAlmacenRouter = Router();

detMovAlmacenRouter.get("/",getDetMovAlmacenHandler);
detMovAlmacenRouter.post("/",createDetMovAlmacenHandler);
detMovAlmacenRouter.delete("/:id",deleteDetMovAlmacenHandler);
detMovAlmacenRouter.put("/:id",updateDetMovAlmacenHandler);

module.exports = detMovAlmacenRouter;