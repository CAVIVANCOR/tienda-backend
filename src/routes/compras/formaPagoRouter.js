const {Router} = require("express");
const {getFormaPagoHandler,createFormaPagoHandler, deleteFormaPagoHandler, updateFormaPagoHandler}=require("../../handlers/compras/formaPagoHandlers");
const formaPagoRouter = Router();

formaPagoRouter.get("/",getFormaPagoHandler);
formaPagoRouter.post("/",createFormaPagoHandler);
formaPagoRouter.delete("/:id",deleteFormaPagoHandler);
formaPagoRouter.put("/:id",updateFormaPagoHandler);

module.exports = formaPagoRouter;