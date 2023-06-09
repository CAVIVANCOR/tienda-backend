const {Router} = require("express");
const {getTiposCambioHandler, createTipoCambioHandler}=require("../../handlers/tablas/tipoCambioHandlers");
const tipoCambioRouter = Router();

tipoCambioRouter.get("/",getTiposCambioHandler);
tipoCambioRouter.post("/",createTipoCambioHandler);

module.exports = tipoCambioRouter;
