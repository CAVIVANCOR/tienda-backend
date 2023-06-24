const {Router} = require("express");
const {getTiposDocHandler, createTipoDocHandler, deleteTipoDocumentoHandler}=require("../../handlers/tablas/tipoDocumentoHandlers");
const tipoDocumentoRouter = Router();

tipoDocumentoRouter.get("/",getTiposDocHandler);
tipoDocumentoRouter.post("/",createTipoDocHandler);
tipoDocumentoRouter.delete("/:id",deleteTipoDocumentoHandler);

module.exports = tipoDocumentoRouter;
