const {Router} = require("express");
const {getTiposCambioHandler, createTipoCambioHandler, deleteteTipoCambioHandler, updateTiposCambioHandler, searchTiposCambioHandler}=require("../../handlers/tablas/tipoCambioHandlers");
const tipoCambioRouter = Router();

tipoCambioRouter.get("/",getTiposCambioHandler);
tipoCambioRouter.post("/",createTipoCambioHandler);
tipoCambioRouter.delete("/:id",deleteteTipoCambioHandler);
tipoCambioRouter.put("/:id",updateTiposCambioHandler);
tipoCambioRouter.get("/search/",searchTiposCambioHandler);

module.exports = tipoCambioRouter;
