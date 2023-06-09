const {Router} = require("express");
const {getConceptoAlmacenHandler,createConceptoAlmacenHandler, deleteConceptoAlmacenHandler}=require("../../handlers/almacen/conceptosAlmacenHandlers");
const conceptoAlmacenRouter = Router();

conceptoAlmacenRouter.get("/",getConceptoAlmacenHandler);
conceptoAlmacenRouter.post("/",createConceptoAlmacenHandler);
conceptoAlmacenRouter.delete("/:id",deleteConceptoAlmacenHandler);

module.exports = conceptoAlmacenRouter;