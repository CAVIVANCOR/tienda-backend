const {Router} = require("express");
const {getConceptoMovCHandler,createConceptoMovCHandler,deleteConceptoMovCHandler, updateConceptoMovCHandler}=require("../../handlers/cajaybancos/conceptoMovCHandlers");
const conceptoMovCRouter = Router();

conceptoMovCRouter.get("/",getConceptoMovCHandler);
conceptoMovCRouter.post("/",createConceptoMovCHandler);
conceptoMovCRouter.delete("/:id",deleteConceptoMovCHandler);
conceptoMovCRouter.put("/:id",updateConceptoMovCHandler);

module.exports = conceptoMovCRouter;