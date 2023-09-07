const {Router} = require("express");
const {getFormaPagoHandler,createFormaPagoHandler, deleteFormaPagoHandler, updateFormaPagoHandler, searchFormaPagoHandler}=require("../../handlers/compras/formaPagoHandlers");
const formaPagoRouter = Router();

formaPagoRouter.get("/",getFormaPagoHandler);
formaPagoRouter.post("/",createFormaPagoHandler);
formaPagoRouter.delete("/:id",deleteFormaPagoHandler);
formaPagoRouter.put("/:id",updateFormaPagoHandler);
formaPagoRouter.post("/search/",searchFormaPagoHandler);

module.exports = formaPagoRouter;