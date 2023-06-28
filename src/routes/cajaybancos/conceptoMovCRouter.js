const {Router} = require("express");
const {getConceptoMovCHandler,createConceptoMovCHandler,deleteConceptoMovCHandler, updateConceptoMovCHandler, searchConceptoMovCHandler}=require("../../handlers/cajaybancos/conceptoMovCHandlers");
const conceptoMovCRouter = Router();

conceptoMovCRouter.get("/",getConceptoMovCHandler);
conceptoMovCRouter.post("/",createConceptoMovCHandler);
conceptoMovCRouter.delete("/:id",deleteConceptoMovCHandler);
conceptoMovCRouter.put("/:id",updateConceptoMovCHandler);
conceptoMovCRouter.get("/search/",searchConceptoMovCHandler);

module.exports = conceptoMovCRouter;