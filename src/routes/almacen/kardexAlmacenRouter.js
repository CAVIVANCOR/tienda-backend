const {Router} = require("express");
const {getKardexAlmacenHandler,createKardexAlmacenHandler, deleteKardexAlmacenHandler, updateKardexAlmacenHandler, searchKardexAlmacenHandler}=require("../../handlers/almacen/kardexAlmacenHandlers");
const kardexAlmacenRouter = Router();

kardexAlmacenRouter.get("/",getKardexAlmacenHandler);
kardexAlmacenRouter.post("/",createKardexAlmacenHandler);
kardexAlmacenRouter.delete("/:idDetMovAlmacen",deleteKardexAlmacenHandler);
kardexAlmacenRouter.put("/:idDetMovAlmacen/:idConceptoAlmacen/:idClienteProveedor", updateKardexAlmacenHandler);
kardexAlmacenRouter.get("/search/",searchKardexAlmacenHandler);

module.exports = kardexAlmacenRouter;