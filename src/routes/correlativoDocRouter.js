const {Router} = require("express");
const {getCorrelativoDocHandler}=require("../handlers/correlativoDocHandlers");
const correlativoDocRouter = Router();

correlativoDocRouter.get("/",getCorrelativoDocHandler);

module.exports = correlativoDocRouter;