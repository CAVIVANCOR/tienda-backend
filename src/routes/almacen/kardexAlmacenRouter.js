const {Router} = require("express");
const {getKardexAlmacenHandler,createKardexAlmacenHandler, deleteKardexAlmacenHandler, updateKardexAlmacenHandler}=require("../../handlers/almacen/kardexAlmacenHandlers");
const kardexAlmacenRouter = Router();

kardexAlmacenRouter.get("/",getKardexAlmacenHandler);
kardexAlmacenRouter.post("/",createKardexAlmacenHandler);
kardexAlmacenRouter.delete("/:idDetMovAlmacen",deleteKardexAlmacenHandler);
kardexAlmacenRouter.put("/:idDetMovAlmacen/:idConceptoAlmacen/:idClienteProveedor", updateKardexAlmacenHandler);

module.exports = kardexAlmacenRouter;