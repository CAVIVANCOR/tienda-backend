const {Router} = require("express");
const {getTiposDocHandler}=require("../handlers/tipoDocumentoHandlers");
const tipoDocumentoRouter = Router();

tipoDocumentoRouter.get("/",getTiposDocHandler);

module.exports = tipoDocumentoRouter;
