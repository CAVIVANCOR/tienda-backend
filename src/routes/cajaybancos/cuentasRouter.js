const {Router} = require("express");
const {getCuentasHandler,createCuentasHandler}=require("../../handlers/cajaybancos/cuentasHandlers");
const cuentasRouter = Router();

cuentasRouter.get("/",getCuentasHandler);
cuentasRouter.post("/",createCuentasHandler);

module.exports = cuentasRouter;