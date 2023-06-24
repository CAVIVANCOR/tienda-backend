const {Router}=require("express");
const {getCuentasBancariasCliProvHandler,createCuentasBancariasCliProvHandler, deleteCuentasBancariasCliProvHandler, updateCuentasBancariasCliProvHandler} = require("../../handlers/clientesProveedores/cuentasBancariasHandlers");
const cuentasBancariasRouter = Router();

cuentasBancariasRouter.get("/",getCuentasBancariasCliProvHandler);
cuentasBancariasRouter.post("/",createCuentasBancariasCliProvHandler);
cuentasBancariasRouter.delete("/:id",deleteCuentasBancariasCliProvHandler);
cuentasBancariasRouter.put("/:id",updateCuentasBancariasCliProvHandler);

module.exports = cuentasBancariasRouter;