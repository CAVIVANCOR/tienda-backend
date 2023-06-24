const {Router} = require("express");
const {getConceptoAlmacenHandler,createConceptoAlmacenHandler, deleteConceptoAlmacenHandler, updateConceptoAlmacenHandler}=require("../../handlers/almacen/conceptosAlmacenHandlers");
const conceptoAlmacenRouter = Router();

conceptoAlmacenRouter.get("/",getConceptoAlmacenHandler);
conceptoAlmacenRouter.post("/",createConceptoAlmacenHandler);
conceptoAlmacenRouter.delete("/:id",deleteConceptoAlmacenHandler);
conceptoAlmacenRouter.put("/:id",updateConceptoAlmacenHandler);

module.exports = conceptoAlmacenRouter;