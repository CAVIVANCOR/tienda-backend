const {Router} = require("express");
const {getFormaPagoHandler,createFormaPagoHandler, deleteFormaPagoHandler}=require("../../handlers/compras/formaPagoHandlers");
const formaPagoRouter = Router();

formaPagoRouter.get("/",getFormaPagoHandler);
formaPagoRouter.post("/",createFormaPagoHandler);
formaPagoRouter.delete("/:id",deleteFormaPagoHandler);

module.exports = formaPagoRouter;