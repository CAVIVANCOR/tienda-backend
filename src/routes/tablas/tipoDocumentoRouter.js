const {Router} = require("express");
const {getTiposDocHandler, createTipoDocHandler, deleteTipoDocumentoHandler, updateTipoDocumentoHandler, searchTipoDocumentoHandler}=require("../../handlers/tablas/tipoDocumentoHandlers");
const tipoDocumentoRouter = Router();

tipoDocumentoRouter.get("/",getTiposDocHandler);
tipoDocumentoRouter.post("/",createTipoDocHandler);
tipoDocumentoRouter.delete("/:id",deleteTipoDocumentoHandler);
tipoDocumentoRouter.put("/:id",updateTipoDocumentoHandler);
tipoDocumentoRouter.get("/search/",searchTipoDocumentoHandler);

module.exports = tipoDocumentoRouter;
