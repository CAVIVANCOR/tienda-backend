const {Router} = require("express");
const {getCorrelativoDocHandler,createCorrelativoDocHandler, deleteCorrelativoDocHandler, updateCorrelativoDocHandler}=require("../../handlers/tablas/correlativoDocHandlers");
const correlativoDocRouter = Router();

correlativoDocRouter.get("/",getCorrelativoDocHandler);
correlativoDocRouter.post("/",createCorrelativoDocHandler);
correlativoDocRouter.delete("/:id",deleteCorrelativoDocHandler);
correlativoDocRouter.put("/:id",updateCorrelativoDocHandler);

module.exports = correlativoDocRouter;