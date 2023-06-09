const {Router}=require("express");
const {getCuentasBancariasCliProvHandler,createCuentasBancariasCliProvHandler} = require("../../handlers/clientesProveedores/cuentasBancariasHandlers");
const cuentasBancariasRouter = Router();

cuentasBancariasRouter.get("/",getCuentasBancariasCliProvHandler);
cuentasBancariasRouter.post("/",createCuentasBancariasCliProvHandler);

module.exports = cuentasBancariasRouter;