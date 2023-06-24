const {Router} = require("express");
const {getTiposCambioHandler, createTipoCambioHandler, deleteteTipoCambioHandler, updateTiposCambioHandler}=require("../../handlers/tablas/tipoCambioHandlers");
const tipoCambioRouter = Router();

tipoCambioRouter.get("/",getTiposCambioHandler);
tipoCambioRouter.post("/",createTipoCambioHandler);
tipoCambioRouter.delete("/:id",deleteteTipoCambioHandler);
tipoCambioRouter.put("/:id",updateTiposCambioHandler);

module.exports = tipoCambioRouter;
