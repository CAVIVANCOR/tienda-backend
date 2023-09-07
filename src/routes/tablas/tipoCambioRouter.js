const {Router} = require("express");
const {getTiposCambioHandler, createTipoCambioHandler, deleteteTipoCambioHandler, updateTiposCambioHandler, searchTiposCambioHandler, getLastTiposCambioHandler}=require("../../handlers/tablas/tipoCambioHandlers");
const tipoCambioRouter = Router();

tipoCambioRouter.get("/",getTiposCambioHandler);
tipoCambioRouter.get("/last",getLastTiposCambioHandler);
tipoCambioRouter.post("/",createTipoCambioHandler);
tipoCambioRouter.delete("/:id",deleteteTipoCambioHandler);
tipoCambioRouter.put("/:id",updateTiposCambioHandler);
tipoCambioRouter.post("/search/",searchTiposCambioHandler);

module.exports = tipoCambioRouter;
