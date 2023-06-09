const {Router} = require("express");
const {getFormaPagoHandler,createFormaPagoHandler}=require("../../handlers/compras/formaPagoHandlers");
const formaPagoRouter = Router();

formaPagoRouter.get("/",getFormaPagoHandler);
formaPagoRouter.post("/",createFormaPagoHandler);

module.exports = formaPagoRouter;