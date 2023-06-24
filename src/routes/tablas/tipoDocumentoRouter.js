const {Router} = require("express");
const {getTiposDocHandler, createTipoDocHandler, deleteTipoDocumentoHandler, updateTipoDocumentoHandler}=require("../../handlers/tablas/tipoDocumentoHandlers");
const tipoDocumentoRouter = Router();

tipoDocumentoRouter.get("/",getTiposDocHandler);
tipoDocumentoRouter.post("/",createTipoDocHandler);
tipoDocumentoRouter.delete("/:id",deleteTipoDocumentoHandler);
tipoDocumentoRouter.put("/:id",updateTipoDocumentoHandler);

module.exports = tipoDocumentoRouter;
