const {Router} = require("express");
const {getKardexAlmacenHandler,createKardexAlmacenHandler, deleteKardexAlmacenHandler}=require("../../handlers/almacen/kardexAlmacenHandlers");
const kardexAlmacenRouter = Router();

kardexAlmacenRouter.get("/",getKardexAlmacenHandler);
kardexAlmacenRouter.post("/",createKardexAlmacenHandler);
kardexAlmacenRouter.delete("/:idDetMovAlmacen",deleteKardexAlmacenHandler);

module.exports = kardexAlmacenRouter;