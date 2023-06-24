const {Router} = require("express");
const {getConceptoMovCHandler,createConceptoMovCHandler,deleteConceptoMovCHandler}=require("../../handlers/cajaybancos/conceptoMovCHandlers");
const conceptoMovCRouter = Router();

conceptoMovCRouter.get("/",getConceptoMovCHandler);
conceptoMovCRouter.post("/",createConceptoMovCHandler);
conceptoMovCRouter.delete("/:id",deleteConceptoMovCHandler);

module.exports = conceptoMovCRouter;