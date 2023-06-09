const {Router} = require("express");
const {getTiposDocHandler, createTipoDocHandler}=require("../../handlers/tablas/tipoDocumentoHandlers");
const tipoDocumentoRouter = Router();

tipoDocumentoRouter.get("/",getTiposDocHandler);
tipoDocumentoRouter.post("/",createTipoDocHandler);

module.exports = tipoDocumentoRouter;
