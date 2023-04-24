const {Router} = require("express");
const {getTiposCambioHandler}=require("../../handlers/tablas/tipoCambioHandlers");
const tipoCambioRouter = Router();

tipoCambioRouter.get("/",getTiposCambioHandler);

module.exports = tipoCambioRouter;
