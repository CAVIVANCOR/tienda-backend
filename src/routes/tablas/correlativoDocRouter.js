const {Router} = require("express");
const {getCorrelativoDocHandler,createCorrelativoDocHandler, deleteCorrelativoDocHandler}=require("../../handlers/tablas/correlativoDocHandlers");
const correlativoDocRouter = Router();

correlativoDocRouter.get("/",getCorrelativoDocHandler);
correlativoDocRouter.post("/",createCorrelativoDocHandler);
correlativoDocRouter.delete("/:id",deleteCorrelativoDocHandler);

module.exports = correlativoDocRouter;