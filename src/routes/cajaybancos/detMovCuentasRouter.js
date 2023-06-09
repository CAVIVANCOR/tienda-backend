const {Router} = require("express");
const {getDetMovCuentasHandler,createDetMovCuentasHandler}=require("../../handlers/cajaybancos/detMovCuentasHandlers");
const detMovCuentasRouter = Router();

detMovCuentasRouter.get("/",getDetMovCuentasHandler);
detMovCuentasRouter.post("/",createDetMovCuentasHandler);

module.exports = detMovCuentasRouter;