const {Router} = require("express");
const {getCorrelativoDocHandler,createCorrelativoDocHandler}=require("../../handlers/tablas/correlativoDocHandlers");
const correlativoDocRouter = Router();

correlativoDocRouter.get("/",getCorrelativoDocHandler);
correlativoDocRouter.post("/",createCorrelativoDocHandler);

module.exports = correlativoDocRouter;