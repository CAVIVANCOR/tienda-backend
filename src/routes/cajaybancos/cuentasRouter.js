const {Router} = require("express");
const {getCuentasHandler,createCuentasHandler, deleteCuentasHandler, updateCuentasHandler}=require("../../handlers/cajaybancos/cuentasHandlers");
const cuentasRouter = Router();

cuentasRouter.get("/",getCuentasHandler);
cuentasRouter.post("/",createCuentasHandler);
cuentasRouter.delete("/:id",deleteCuentasHandler);
cuentasRouter.put("/:id",updateCuentasHandler);

module.exports = cuentasRouter;