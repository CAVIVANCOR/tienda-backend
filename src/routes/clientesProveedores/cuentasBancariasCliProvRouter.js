const {Router}=require("express");
const {getCuentasBancariasCliProvHandler,createCuentasBancariasCliProvHandler, deleteCuentasBancariasCliProvHandler} = require("../../handlers/clientesProveedores/cuentasBancariasHandlers");
const cuentasBancariasRouter = Router();

cuentasBancariasRouter.get("/",getCuentasBancariasCliProvHandler);
cuentasBancariasRouter.post("/",createCuentasBancariasCliProvHandler);
cuentasBancariasRouter.delete("/:id",deleteCuentasBancariasCliProvHandler);

module.exports = cuentasBancariasRouter;