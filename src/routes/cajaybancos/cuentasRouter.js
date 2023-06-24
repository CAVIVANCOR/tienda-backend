const {Router} = require("express");
const {getCuentasHandler,createCuentasHandler, deleteCuentasHandler}=require("../../handlers/cajaybancos/cuentasHandlers");
const cuentasRouter = Router();

cuentasRouter.get("/",getCuentasHandler);
cuentasRouter.post("/",createCuentasHandler);
cuentasRouter.delete("/:id",deleteCuentasHandler);

module.exports = cuentasRouter;