const {Router} = require("express");
const {getConceptoMovCHandler,createConceptoMovCHandler}=require("../../handlers/cajaybancos/conceptoMovCHandlers");
const conceptoMovCRouter = Router();

conceptoMovCRouter.get("/",getConceptoMovCHandler);
conceptoMovCRouter.post("/",createConceptoMovCHandler);

module.exports = conceptoMovCRouter;