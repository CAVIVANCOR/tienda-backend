const {Router} = require("express");
const {getKardexCuentasHandler,createKardexCuentasHandler}=require("../../handlers/cajaybancos/kardexCuentasHandlers");
const kardexCuentasRouter = Router();

kardexCuentasRouter.get("/",getKardexCuentasHandler);
kardexCuentasRouter.post("/",createKardexCuentasHandler);

module.exports = kardexCuentasRouter;