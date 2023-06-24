const {Router} = require("express");
const {getTiposCambioHandler, createTipoCambioHandler, deleteteTipoCambioHandler}=require("../../handlers/tablas/tipoCambioHandlers");
const tipoCambioRouter = Router();

tipoCambioRouter.get("/",getTiposCambioHandler);
tipoCambioRouter.post("/",createTipoCambioHandler);
tipoCambioRouter.delete("/:id",deleteteTipoCambioHandler);

module.exports = tipoCambioRouter;
