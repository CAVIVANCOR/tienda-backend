const {Router} = require("express");
const {getDetMovAlmacenHandler,createDetMovAlmacenHandler, deleteDetMovAlmacenHandler, updateDetMovAlmacenHandler, searchDetMovAlmacenHandler}=require("../../handlers/almacen/detMovAlmacenHandlers");
const detMovAlmacenRouter = Router();

detMovAlmacenRouter.get("/",getDetMovAlmacenHandler);
detMovAlmacenRouter.post("/",createDetMovAlmacenHandler);
detMovAlmacenRouter.delete("/:id",deleteDetMovAlmacenHandler);
detMovAlmacenRouter.put("/:id",updateDetMovAlmacenHandler);
detMovAlmacenRouter.get("/search/",searchDetMovAlmacenHandler);

module.exports = detMovAlmacenRouter;