const {Router} = require("express");
const {getCorrelativoDocHandler}=require("../../handlers/tablas/correlativoDocHandlers");
const correlativoDocRouter = Router();

correlativoDocRouter.get("/",getCorrelativoDocHandler);

module.exports = correlativoDocRouter;