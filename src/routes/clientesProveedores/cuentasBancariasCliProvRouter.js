const {Router}=require("express");
const {getCuentasBancariasCliProvHandler} = require("../../handlers/clientesProveedores/cuentasBancariasHandlers");
const cuentasBancariasRouter = Router();

cuentasBancariasRouter.get("/",getCuentasBancariasCliProvHandler);

module.exports = cuentasBancariasRouter;