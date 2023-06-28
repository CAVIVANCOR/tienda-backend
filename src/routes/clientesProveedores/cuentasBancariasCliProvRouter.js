const {Router}=require("express");
const {getCuentasBancariasCliProvHandler,createCuentasBancariasCliProvHandler, deleteCuentasBancariasCliProvHandler, updateCuentasBancariasCliProvHandler, searchCuentasBancariasCliProvHandler} = require("../../handlers/clientesProveedores/cuentasBancariasHandlers");
const cuentasBancariasRouter = Router();

cuentasBancariasRouter.get("/",getCuentasBancariasCliProvHandler);
cuentasBancariasRouter.post("/",createCuentasBancariasCliProvHandler);
cuentasBancariasRouter.delete("/:id",deleteCuentasBancariasCliProvHandler);
cuentasBancariasRouter.put("/:id",updateCuentasBancariasCliProvHandler);
cuentasBancariasRouter.get("/search/",searchCuentasBancariasCliProvHandler);

module.exports = cuentasBancariasRouter;