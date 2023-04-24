const {Router} = require("express");
const {getTiposDocHandler}=require("../../handlers/tablas/tipoDocumentoHandlers");
const tipoDocumentoRouter = Router();

tipoDocumentoRouter.get("/",getTiposDocHandler);

module.exports = tipoDocumentoRouter;
